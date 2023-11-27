import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const allCourses = await Course.find().select("-lectures"); //we dont need lectures array when we are fetching courses lectures for the subscription users only

  res.status(200).json({
    success: true,
    allCourses,
  });
});

export const createCourse = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if(!title || !description || !category || !createdBy) return next(new ErrorHandler("Please add all fields", 400))

  //const file = req.file; //we can get a file as a blob here so then we can convert it as a datauri

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now."
  })
});
