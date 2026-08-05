import jwt from "jsonwebtoken";
import { env } from "../config/env.js"; 

export const generateToken = (user) => {
  return jwt.sign(user, env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
