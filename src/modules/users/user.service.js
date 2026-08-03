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
  return await baseService.findById(id) ;
};

// New centralized function added for the service layer pattern
export const findOrCreateUser = async (firebaseUser) => {
  let user = await User.findOne({
    email: firebaseUser.email,
  });

  if (!user) {
    user = await baseService.create({
      email: firebaseUser.email,
      name: firebaseUser.name || "User",
      photoURL: firebaseUser.picture || "",
      role: "user",
    });
  }

  return user;
};