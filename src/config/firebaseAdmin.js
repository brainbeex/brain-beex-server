// import admin from "firebase-admin";
// import serviceAccount from "./firebaseServiceKey.json" assert { type: "json" };


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;

import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./src/config/firebaseServiceKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;