import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Stats } from "../models/Stats.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("Please fill all fields", 400));

  const to = process.env.MY_MAIL;
  const subject = "Contact from codeBlu";
  const text = `I am ${name} and my Email is ${email}. \n message: ${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your message has been sent.",
  });
});

export const courseRequest = catchAsyncErrors(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course)
    return next(new ErrorHandler("Please fill all fields", 400));

  const to = process.env.MY_MAIL;
  const subject = "Request for a course from codeBlu";
  const text = `I am ${name} and my Email is ${email}. \n ${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your request has been sent.",
  });
});

export const getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  const requiredSize = 12 - stats.length; //this is for when geting the data less 12 from the db then we need to add to complete array of 12.

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscriptions: 0,
      views: 0,
    });
  }

  //last month counts
  const userCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscriptions;
  const viewsCount = statsData[11].views;


  let usersPercentage = 0;
  let subscriptionPercentage = 0;
  let viewsPercentage = 0;


  let usersProfit = true;
  let subscriptionProfit = true;
  let viewsProfit = true;

  if(statsData[10].users === 0) usersPercentage = userCount * 100;
  if(statsData[10].subscriptions === 0) subscriptionPercentage = subscriptionCount * 100;
  if(statsData[10].views === 0) viewsPercentage = viewsCount * 100;

  else{
    const difference = {
        users: statsData[11].users - statsData[10].users, 
        views: statsData[11].views - statsData[10].views, 
        subscriptions: statsData[11].subscriptions - statsData[10].subscriptions, 
    }

    usersPercentage = (difference.users / statsData[10].users) * 100;
    subscriptionPercentage = (difference.subscriptions / statsData[10].subscriptions) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;


    if(usersPercentage < 0) usersProfit = false;
    if(subscriptionPercentage < 0) subscriptionProfit = false;
    if(viewsPercentage < 0) viewsProfit = false;
  }


  res.status(200).json({
    success: true,
    stats: statsData,
    userCount,
    subscriptionCount,
    viewsCount,
    usersPercentage,
    viewsPercentage,
    subscriptionPercentage,
    usersProfit,
    viewsProfit,
    subscriptionProfit
  });
});
