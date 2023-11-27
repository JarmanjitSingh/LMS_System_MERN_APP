import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { compare, hash } from "bcrypt";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  //const file = req.file;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please fill all fields", 400));

  let isUserExist = await User.findOne({ email });

  if (isUserExist) return next(new ErrorHandler("User already exists", 409));

  //upload file on cloudinary


  const hashedPassword = await hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: "temp",
      url: "temp",
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

  const matchPassword = await compare(password, isUserExist.password);

  if (!matchPassword)
    return next(new ErrorHandler("Incorrect email or password", 401));

  sendToken(res, isUserExist, `Welcome back, ${isUserExist.name}`, 201);
});


export const logout = catchAsyncErrors(async (req, res, next) => {
   
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logged out successfully."
    })
  });
