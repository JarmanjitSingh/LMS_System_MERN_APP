import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const allCourses = await Course.find().select("-lectures"); //we dont need lectures array when we are fetching courses lectures for the subscription users only

  res.status(200).json({
    success: true,
    allCourses,
  });
});

export const createCourse = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please add all fields", 400));

    
  const file = req.file; //we can get a file as a blob here so then we can convert it as a datauri
 // console.log(file)

  const fileUri = getDataUri(file)
  //console.log(fileUri.content)

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now.",
  });
});

export const getCourseLectures = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorHandler("Invalid course id", 404));

  course.views += 1;
  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});



export const addLecture = catchAsyncErrors(async (req, res, next) => {

  const {id} = req.params
  const {title, description} = req.body;

  //const file = req.file

  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Invalid course id", 404));

  //upload file on cloudinary

  course.lectures.push({
    title,
    description,
    video: {
      public_id: "url",
      url: "url",
    },
  });

  numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added successfully",
  });
});
