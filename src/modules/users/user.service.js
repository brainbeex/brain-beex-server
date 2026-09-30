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

// Updated function to check and save the stable Firebase identity link
export const findOrCreateUser = async (firebaseUser) => {
  // 1. Check if a user with this specific Firebase UID already exists
  let user = await User.findOne({
    firebaseUid: firebaseUser.uid,
  });

  // 2. Fallback to lookup by email if UID isn't bound yet
  if (!user) {
    user = await User.findOne({
      email: firebaseUser.email,
    });

    // 🛑 SECURITY CHECK: If user found by email already has a different Firebase UID, reject immediately
    if (user && user.firebaseUid && user.firebaseUid !== firebaseUser.uid) {
      const error = new Error(
        "Firebase account does not match the existing user account"
      );
      error.statusCode = 403;
      throw error;
    }
  }

  // 3. Create a new user if no existing account is found at all
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
