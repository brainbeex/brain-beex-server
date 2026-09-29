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
  // 1. Primary lookup using the stable Firebase identifier
  let user = await User.findOne({
    firebaseUid: firebaseUser.uid,
  });

  // 2. Secondary fallback lookup checking the email address matches
  if (!user) {
    user = await User.findOne({
      email: firebaseUser.email,
    });
  }

  // 3. Create the user record through BaseService if it doesn't exist yet
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
