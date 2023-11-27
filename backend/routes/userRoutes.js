import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

//to regiter
router.route("/register").post(register)

//to login

//logout

//get my profile

//changePassword

//update profile

//update profile picture

//forget password

//reset password


//add to playlist

//remove from playlist  


export default router