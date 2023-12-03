import express from "express";
import { addToPlaylist, changePassword, forgetPassword, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//to regiter
router.route("/register").post(singleUpload ,register)

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
router.route("/updateprofilepicture").put(isAuthenticated, singleUpload, updateProfilePicture)

//forget password
router.route("/forgetpassword").post(forgetPassword)

//reset password
router.route("/resetpassword/:token").put(resetPassword)

//add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist)

//remove from playlist  
router.route("/removeFromPlaylist").delete(isAuthenticated, removeFromPlaylist)


export default router