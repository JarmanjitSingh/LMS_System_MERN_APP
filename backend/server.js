import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`server is working on a port ${process.env.PORT}`)
})