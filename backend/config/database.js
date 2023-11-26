import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "LMS_DB" });
    console.log("Database connected.");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
