import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../shared/ApiError.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  // 🚀 BYPASS CHECK: Keep your mock developer configuration alive for local testing
  if (env.NODE_ENV !== "production" && token === "dev-token") {
    // 🛠️ FIXED: Added role: "admin" to align the mock payload format with real JWT entries
    req.user = {
      uid: "mock_developer_12345",
      email: "developer@brainbeex.com",
      role: "admin", 
      name: "Mock Developer",
      picture: "https://placeholder.com",
    };
    return next();
  }

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization format",
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default verifyToken;
