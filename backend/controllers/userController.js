import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/Stats.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const file = req.file;

  const { name, email, password } = req.body;

  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please fill all fields", 400));

  let isUserExist = await User.findOne({ email });

  if (isUserExist) return next(new ErrorHandler("User already exists", 409));

  const fileUri = getDataUri(file);
  //upload file on cloudinary
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please fill all fields", 400));

  let isUserExist = await User.findOne({ email }).select("+password");

  if (!isUserExist)
    return next(new ErrorHandler("Please register first.", 401));

  const matchPassword = await isUserExist.comparePassword(password);

  if (!matchPassword)
    return next(new ErrorHandler("Incorrect email or password", 401));

  sendToken(res, isUserExist, `Welcome back, ${isUserExist.name}`, 201);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "none",
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const changePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please fill all fields", 400));

  const user = await User.findById(req.user._id).select("+password");

  const oldPasswordMatch = await user.comparePassword(oldPassword);

  if (!oldPasswordMatch)
    return next(new ErrorHandler("Incorrect old password", 400));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

export const updateProfilePicture = catchAsyncErrors(async (req, res, next) => {
  const file = req.file;
  if (!file) return next(new ErrorHandler("Please fill all fields", 400));

  const user = await User.findById(req.user._id);

  const fileUri = getDataUri(file);
  //upload file on cloudinary
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
  });
});

export const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();

  await user.save();

  //send token via email
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `Click on the link to reset your password. ${url}. If you have not requested then please ignore`;

  await sendEmail(user.email, "CodeBlu Reset Password", message);

  res.status(200).json({
    success: true,
    message:
      "If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.",
  });
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 403));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const addToPlaylist = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);
  if (!course) return next(new ErrorHandler("Invalid course id", 404));

  const itemAlreadyExists = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });

  if (itemAlreadyExists) return next(new ErrorHandler("Already added", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to playlist",
  });
});

export const removeFromPlaylist = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("Invalid course id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed from playlist",
  });
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  if (user.role === "admin") {
    user.role = "user";
  } else {
    user.role = "admin";
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Role updated",
  });
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //cancel subscription

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const deleteMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //cancel subscription

  await user.deleteOne();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User deleted successfully",
    });
});

//creating a watcher for stats because of realtime data when ever change in the user model then callback function runs
User.watch().on("change", async () => {
  const stat = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const subscribedUsers = await User.find({ "subscription.status": "active" });

  stat[0].users = await User.countDocuments();
  stat[0].subscriptions = subscribedUsers.length;
  stat[0].createdAt = new Date(Date.now());

  await stat[0].save();
});
