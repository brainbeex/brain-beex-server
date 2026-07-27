import admin from "../../config/firebaseAdmin.js";
import { generateToken } from "../../utils/generateToken.js";
// import User from "../users/user.model.js";
import { findOrCreateUser } from "../users/user.service.js";

export const createJwtService = async (idToken) => {
  if (!idToken) {
    throw new Error("No token provided");
  }

  // Verify Firebase token
  const decoded = await admin.auth().verifyIdToken(idToken);

  // Clean, centralized service layer call instead of direct DB queries
  const user = await findOrCreateUser(decoded);

  // // Check if user exists
  // let user = await User.findOne({
  //   email: decoded.email,
  // });

  // // Create user if not found
  // if (!user) {
  //   user = await User.create({
  //     email: decoded.email,
  //     name: decoded.name || "User",
  //     photoURL: decoded.picture || "",
  //     role: "user",
  //   });
  // }

  // Generate JWT
  const token = generateToken({
    uid: decoded.uid,
    email: decoded.email,
    role: user.role,
  });

  return {
    token,
    role: user.role,
  };
};