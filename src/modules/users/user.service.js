import User from "./user.model.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

// New centralized function added for the service layer pattern
export const findOrCreateUser = async (firebaseUser) => {
  let user = await User.findOne({
    email: firebaseUser.email,
  });

  if (!user) {
    user = await User.create({
      email: firebaseUser.email,
      name: firebaseUser.name || "User",
      photoURL: firebaseUser.picture || "",
      role: "user",
    });
  }

  return user;
};