import { Course } from "../models/Course.js"


export const getAllCourses = async(req, res, next)=>{
    const allCourses = await Course.find();

    res.status(200).json({
        success: true,
        allCourses
    })
}