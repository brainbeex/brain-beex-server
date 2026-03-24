import dotenv from "dotenv";

dotenv.config({ path: "./.env" }); 

console.log("ENV CHECK:", process.env.FIREBASE_PROJECT_ID);

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });




// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import app from "./app.js";

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });



// import "dotenv/config";
// import mongoose from "mongoose";
// import app from "./app.js";
// import dotenv from "dotenv";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error(err);
//   });