import dotenv from "dotenv";
dotenv.config(); 

import admin from "firebase-admin";

const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!privateKey) {
  throw new Error("FIREBASE_PRIVATE_KEY is missing in environment variables");
}

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: privateKey.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// console.log("PRIVATE KEY:", process.env.FIREBASE_PRIVATE_KEY);
// console.log("ENV TEST:", process.env.FIREBASE_PROJECT_ID);

export default admin;



// import admin from "firebase-admin";
// import serviceAccount from "./firebaseServiceKey.json" assert { type: "json" };


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;

// import admin from "firebase-admin";
// import fs from "fs";

// const serviceAccount = JSON.parse(
//   fs.readFileSync("./src/config/firebaseServiceKey.json", "utf8")
// );

// const serviceAccount = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
// };


