import express from "express";
import {config} from "dotenv";

config({
    path: './config/config.env'
})
const app = express();


//Importing and using routes
import courseRoute from "./routes/courseRoutes.js"

app.use("/api/v1", courseRoute)


export default app