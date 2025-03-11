import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "./config.env",
});

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(`error in connecting db :`, error);
  }
}

export default connectDb;
