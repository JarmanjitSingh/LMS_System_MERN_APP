import express, { urlencoded } from "express";
import {config} from "dotenv";

config({
    path: './config/config.env'
})
const app = express();


//using middlewares
app.use(express.json());
app.use(urlencoded({
    extended: true
})) //these two middleware are used to access data from req.body

//Importing and using routes
import courseRoute from "./routes/courseRoutes.js"
import ErrorMiddleware from "./middlewares/Error.js";

app.use("/api/v1", courseRoute)

//using error middleware 
app.use(ErrorMiddleware)


export default app