import admin from "firebase-admin";
import { env } from "./env.js"; // Import validated env data

if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: env.FIREBASE_PROJECT_ID,
    private_key: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: env.FIREBASE_CLIENT_EMAIL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
