import express from "express";
import { changePassword, getMyProfile, login, logout, register, updateProfile, updateProfilePicture } from "../controllers/userController.js";
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
router.route("/changepassword").put(isAuthenticated, changePassword)

//update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile)

//update profile picture
router.route("/updateprofilepicture").put(isAuthenticated, updateProfilePicture)


//forget password

//reset password


//add to playlist

//remove from playlist  


export default router