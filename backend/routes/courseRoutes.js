import express from "express";
import { createCourse, getAllCourses } from "../controllers/courseController.js";

const router = express.Router();

// get all courses withour lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin 
router.route("/createcourse").post(createCourse);

// add lecture, delete course, get course details 

// delete lecture



export default router;