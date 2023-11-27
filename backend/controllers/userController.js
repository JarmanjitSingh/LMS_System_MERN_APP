import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import {User} from "../models/User.js"
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  //const file = req.file;

  if(!name || !email || !password) return next(new ErrorHandler("Please fill all fields", 400))

  let isUserExist = await User.findOne({email})

  if(isUserExist) return next (new ErrorHandler("User already exists", 409))

  //upload file on cloudinary

 const user =  await User.create({
    name, email, password, avatar:{
        public_id: "temp",
        url: "temp"
    }
  })

  sendToken(res, user, "Registered Successfully", 201)
});
