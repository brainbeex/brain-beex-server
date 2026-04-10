import admin from "../../config/firebaseAdmin.js";
import { generateToken } from "../../utils/generateToken.js";
import User from "../../models/users/user.model.js";

export const createJwt = async (req, res) => {
  console.log("🔥 JWT API CALLED");

  try {
    const { idToken } = req.body;

    if (!idToken) {
      console.log("❌ No ID Token received");
      return res.status(400).json({ success: false, message: "No token provided" });
    }

    console.log("✅ ID TOKEN RECEIVED");

    // 🔥 Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);

    console.log("✅ DECODED TOKEN:", decoded);

    // 🔍 Check if user exists
    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      console.log("🆕 Creating new user in MongoDB...");

      user = await User.create({
        email: decoded.email,
        name: decoded.name || "User",
        photoURL: decoded.picture || "",
        role: "user",
      });

      console.log("✅ USER SAVED TO DB");
    } else {
      console.log("ℹ️ User already exists in DB");
    }

    // 🔐 Generate JWT
    const token = generateToken({
      uid: decoded.uid,
      email: decoded.email,
      role: user.role,
    });

    console.log("✅ JWT GENERATED");

    res.json({
      success: true,
      token,
      role: user.role,
    });

  } catch (error) {
    console.error("❌ JWT ERROR:", error.message);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};




// import admin from "../../config/firebaseAdmin.js";
// import { generateToken } from "../../utils/generateToken.js";
// // import User from "../users/users.model.js";
// import User from "../../models/users/user.model.js";

// export const createJwt = async (req, res) => {
//   try {
//     const { idToken } = req.body;

//     const decoded = await admin.auth().verifyIdToken(idToken);

//     // check if exists
//     let user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       user = await User.create({
//         email: decoded.email,
//         name: decoded.name || "User",
//         photoURL: decoded.picture || "",
//         role: "user",
//       });
//     }

//     const token = generateToken({
//       uid: decoded.uid,
//       email: decoded.email,
//       role: user.role,
//     });

//     res.json({ success: true, token, role: user.role, });
//   } catch (error) {
//     console.error("JWT ERROR", error);
//     res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };