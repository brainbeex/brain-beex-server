import User from "../modules/users/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user?.email) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const user = await User.findOne({
    email: req.user.email,
  });

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
});

export default verifyAdmin;