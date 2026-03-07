import admin from "../../config/firebaseAdmin.js";
import { generateToken } from "../../utils/generateToken.js";

export const createJwt = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(idToken);

    const token = generateToken(decoded);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};