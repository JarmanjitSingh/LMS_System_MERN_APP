import express from "express";
import {config} from "dotenv";

config({
    path: './config/config.env'
})
const app = express();


//Importing and using routes
import courseRoute from "./routes/courseRoutes.js"
import ErrorMiddleware from "./middlewares/Error.js";

app.use("/api/v1", courseRoute)

//using error middleware 
app.use(ErrorMiddleware)


export default app