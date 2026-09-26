import jwt from "jsonwebtoken";
import env from "../config/env.js"; // Imported central env data object as default export
import ApiError from "../shared/ApiError.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];

    // 🚀 BYPASS CHECK: Keep your mock developer configuration alive for local testing
    if (env.NODE_ENV !== "production" && token === "dev-token") {
      req.user = {
        uid: "mock_developer_12345",
        email: "developer@brainbeex.com",
        name: "Mock Developer",
        picture: "https://placeholder.com",
      };
      return next();
    }

    if (!token) {
      throw new ApiError(401, "Invalid authorization format");
    }

    // 2. Replaced process.env.JWT_SECRET with validated env object
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    next(new ApiError(401, error.message || "Invalid or expired token"));
  }
};

export default verifyToken;
