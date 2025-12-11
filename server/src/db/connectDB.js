import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};


export default connectDB;
