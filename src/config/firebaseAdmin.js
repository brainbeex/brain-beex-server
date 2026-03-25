import admin from "firebase-admin";

let app;

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey) {
    console.error("❌ Missing FIREBASE_PRIVATE_KEY");
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: privateKey?.replace(/\\n/g, "\n"),
    }),
  });
}

export default admin;






// import dotenv from "dotenv";
// dotenv.config(); 

// import admin from "firebase-admin";

// const privateKey = process.env.FIREBASE_PRIVATE_KEY;

// if (!privateKey) {
//   throw new Error("FIREBASE_PRIVATE_KEY is missing in environment variables");
// }

// const serviceAccount = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key: privateKey.replace(/\\n/g, "\n"),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;
