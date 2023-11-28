import express from "express";
import { changePassword, forgetPassword, getMyProfile, login, logout, register, resetPassword, updateProfile, updateProfilePicture } from "../controllers/userController.js";
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
router.route("/forgetpassword").post(forgetPassword)

//reset password
router.route("/resetpassword/:token").put(resetPassword)

//add to playlist

//remove from playlist  


export default router