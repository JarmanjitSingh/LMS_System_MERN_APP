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

  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Invalid course id", 404));

  //upload file on cloudinary

  const file = req.file; //we can get a file as a blob here so then we can convert it as a datauri
 
   const fileUri = getDataUri(file)
 
   const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video"
   })

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added successfully",
  });
});


export const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;

  const course = await Course.findById(id);
  if(!course) return next(new Error('Course not found', 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];

    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video"
    })
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course deleted successfully.",
  });
});


export const deleteLecture = catchAsyncErrors(async (req, res, next) => {
  const {courseId, lectureId} = req.query;

  const course = await Course.findById(courseId);
  if(!course) return next(new Error('Course not found', 404));

  const lecture = course.lectures.find(item => {
    if(item._id.toString() === lectureId.toString()) return item
  })

  if(!lecture) return next(new ErrorHandler("Lecture not found", 404));
  
  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: 'video'
  });

  course.lectures = course.lectures.filter(item =>{
    if(item._id.toString() !== lectureId.toString()) return item
  })

  course.numOfVideos = course.lectures.length;

  await course.save();
  

  
  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully.",
  });
});