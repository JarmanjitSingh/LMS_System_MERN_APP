import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//to regiter
router.route("/register").post(register)

//to login
router.route("/login").post(login)

//logout
router.route("/logout").get(isAuthenticated, logout)

//get my profile
router.route("/me").get(isAuthenticated, getMyProfile)

//changePassword

//update profile

//update profile picture

//forget password

//reset password


//add to playlist

//remove from playlist  


export default router