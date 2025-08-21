// // mongoPassword=aKGvDVoO8J8CU8IJ
// // mongoUserName=wajiali744

// import mongoose from "mongoose";



// const connectDB = async () => {

//     mongoose.set('strictQuery', false);

//     try {
//         await mongoose.connect(process.env.MONGO_URI!);
//         // console.log('mongoDB connected.');
//     } catch (error) {
//         console.log("MongoDB connection failed" , error);
//     }
    
// }

// export default connectDB;

import mongoose from "mongoose";


let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected || mongoose.connection.readyState === 1) return;

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing in environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;

