import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import { instance } from "../server.js";
import ErrorHandler from "../utils/errorHandler.js";

export const buySubscription = catchAsyncErrors(async(req, res, next)=>{
const user  =  await User.findById(req.user._id);

if(user.role === "admin") return new ErrorHandler("Admin can't buy a subscription", 400);

const plan_id = process.env.PLAN_ID || "plan_N98UtH6D7VAOaI"

const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12
})

user.subscription.id = subscription.id;
user.subscription.status = subscription.status;

await user.save()

res.status(201).json({
    success: true,
    subscriptionId: subscription.id
})
})