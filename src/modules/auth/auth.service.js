import admin from "../../config/firebaseAdmin.js";
import { generateToken } from "../../utils/generateToken.js";
import { findOrCreateUser } from "../users/user.service.js";

export const createJwtService = async (idToken) => {
  if (!idToken) {
    throw new Error("No token provided");
  }

  // Verify Firebase token
  const decoded = await admin.auth().verifyIdToken(idToken);

  if (!decoded.uid || !decoded.email) {
    const error = new Error("Invalid Firebase user information");
    error.statusCode = 401;
    throw error;
  }

  // Find existing user or create a new one
  const user = await findOrCreateUser(decoded);

  // Generate application JWT
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