import User from "./user.model.js";
import BaseService from "../../shared/BaseService.js";

const baseService = new BaseService(User);

export const createUser = async (data) => {
  return await baseService.create(data);
};

export const getUsers = async () => {
  return await baseService.find();
};

export const getUserById = async (id) => {
  return await baseService.findById(id);
};

// Complete identity mapping service function including legacy user upgrades
export const findOrCreateUser = async (firebaseUser) => {
  // 1. Primary lookup using the stable Firebase UID
  let user = await User.findOne({
    firebaseUid: firebaseUser.uid,
  });

  // 2. Secondary fallback lookup checking the email match
  if (!user) {
    user = await User.findOne({
      email: firebaseUser.email,
    });

    // 🛑 SECURITY CHECK: Prevent account hijacking across non-matching identities
    if (user && user.firebaseUid && user.firebaseUid !== firebaseUser.uid) {
      const error = new Error(
        "Firebase account does not match the existing user account"
      );
      error.statusCode = 403;
      throw error;
    }

    // 🔗 IDENTITY BINDING: Safely attach Firebase UID to existing legacy user
    if (user && !user.firebaseUid) {
      user.firebaseUid = firebaseUser.uid;
      await user.save();
    }
  }

  // 3. Provision a completely new account if absolutely no matches exist
  if (!user) {
    user = await baseService.create({
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.name || "User",
      photoURL: firebaseUser.picture || "",
      role: "user",
    });
  }

  return user;
};
