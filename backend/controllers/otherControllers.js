import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncErrors(async(req, res, next)=>{

    const {name, email, message} = req.body;

    if(!name || !email || !message) return next(new ErrorHandler("Please fill all fields", 400))

    const to = process.env.MY_MAIL;
    const subject = "Contact from codeBlu";
    const text = `I am ${name} and my Email is ${email}. \n ${message}`

    await sendEmail(to, subject, text)

    res.status(200).json({
        success: true,
        message: "Your message has been sent."
    })
})

export const courseRequest = catchAsyncErrors(async(req, res, next)=>{

    const {name, email, course} = req.body;

    if(!name || !email || !course) return next(new ErrorHandler("Please fill all fields", 400))


    const to = process.env.MY_MAIL;
    const subject = "Request for a course from codeBlu";
    const text = `I am ${name} and my Email is ${email}. \n ${course}`

    await sendEmail(to, subject, text)

    res.status(200).json({
        success: true,
        message: "Your request has been sent."
    })
})

export const getDashboardStats = catchAsyncErrors(async(req, res, next)=>{

    res.status(200).json({
        success: true
    })
})