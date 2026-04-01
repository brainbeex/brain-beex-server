import admin from "../../config/firebaseAdmin.js";
import { generateToken } from "../../utils/generateToken.js";
// import User from "../users/users.model.js";
import User from "../../models/users/user.model.js";

export const createJwt = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(idToken);

    // check if exists
    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      user = await User.create({
        email: decoded.email,
        name: decoded.name || "User",
        photoURL: decoded.picture || "",
        role: "user",
      });
    }

    const token = generateToken({
      uid: decoded.uid,
      email: decoded.email,
      role: user.role,
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};