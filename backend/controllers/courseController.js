import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import { Course } from "../models/Course.js"


export const getAllCourses = catchAsyncErrors(async(req, res, next)=>{
    const allCourses = await Course.find();

    res.status(200).json({
        success: true,
        allCourses
    })
})