import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });


nodeCron.schedule("0 0 0 1 * *", async()=>{ //on every months first day this function will execute
    try {
        await Stats.create({});
    } catch (error) {
        console.log(error)
    }
})



app.listen(process.env.PORT, ()=>{
    console.log(`server is working on a port ${process.env.PORT}`)
})