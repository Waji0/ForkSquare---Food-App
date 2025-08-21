// mongoPassword=aKGvDVoO8J8CU8IJ
// mongoUserName=wajiali744

import mongoose from "mongoose";



const connectDB = async () => {

    mongoose.set('strictQuery', false);

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        // console.log('mongoDB connected.');
    } catch (error) {
        console.log("MongoDB connection failed" , error);
    }
    
}

export default connectDB;