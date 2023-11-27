import express, { urlencoded } from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";

config({
    path: './config/config.env'
})
const app = express();


//using middlewares
app.use(express.json());
app.use(cookieParser())
app.use(urlencoded({
    extended: true
})) //these two middleware are used to access data from req.body

//Importing and using routes
import courseRoute from "./routes/courseRoutes.js"
import userRoute from "./routes/userRoutes.js"

app.use("/api/v1", courseRoute);
app.use("/api/v1", userRoute)




//using error middleware 
import ErrorMiddleware from "./middlewares/Error.js";
app.use(ErrorMiddleware)


export default app