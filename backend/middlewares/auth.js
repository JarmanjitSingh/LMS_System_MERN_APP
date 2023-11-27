import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = await req.cookies;

  if (!token) return next(new ErrorHandler("Please login first.", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
});
