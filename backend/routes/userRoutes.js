import express from "express";
import { login, logout, register } from "../controllers/userController.js";

const router = express.Router();

//to regiter
router.route("/register").post(register)

//to login

router.route("/login").post(login)

//logout
router.route("/logout").get(logout)


//get my profile

//changePassword

//update profile

//update profile picture

//forget password

//reset password


//add to playlist

//remove from playlist  


export default router