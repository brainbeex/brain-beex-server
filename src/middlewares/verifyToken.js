// import jwt from "jsonwebtoken";
// import env from "../config/env.js"; // Imported central env data object as default export
// import ApiError from "../shared/ApiError.js";

// const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       throw new ApiError(401, "Unauthorized: No token provided");
//     }

//     const token = authHeader.split(" ")[1];

//     // 🚀 BYPASS CHECK: Keep your mock developer configuration alive for local testing
//     if (env.NODE_ENV !== "production" && token === "dev-token") {
//       req.user = {
//         uid: "mock_developer_12345",
//         email: "developer@brainbeex.com",
//         name: "Mock Developer",
//         picture: "https://placeholder.com",
//       };
//       return next();
//     }

//     if (!token) {
//       throw new ApiError(401, "Invalid authorization format");
//     }

//     // 2. Replaced process.env.JWT_SECRET with validated env object
//     const decoded = jwt.verify(token, env.JWT_SECRET);
//     req.user = decoded;
    
//     next();
//   } catch (error) {
//     next(new ApiError(401, error.message || "Invalid or expired token"));
//   }
// };

// export default verifyToken;


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

  // 1. Explicitly destructure both the scheme and token elements cleanly
  const [scheme, token] = authHeader.split(" ");

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

  // 2. Validate that the format is strictly "Bearer <JWT>"
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
