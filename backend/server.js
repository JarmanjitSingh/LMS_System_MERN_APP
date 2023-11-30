import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary"

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is working on a port ${process.env.PORT}`)
})