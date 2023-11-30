import express from "express";
import { addLecture, createCourse, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// get all courses withour lectures
router.route("/courses").get(getAllCourses);

// create new course - (((((( only admin )))))) 
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse); 

// add lecture, delete  course, get course details 
router.route("/course/:id").get(getCourseLectures).post(singleUpload, addLecture)

// delete lecture



export default router;