import User from "../models/users/user.model.js"

const verifyAdmin = async (req, res, next) => {

  const email = req.user.email;

  const user = await User.findOne({ email });

  if (!user || user.role !== "admin") {

    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });

  }

  next();

};

export default verifyAdmin;