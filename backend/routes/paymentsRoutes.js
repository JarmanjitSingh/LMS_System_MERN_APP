import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

//Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription)

//Payment verification and save reference in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification)

//getting the razorpaykey 
router.route("/razorpaykey").get(getRazorPayKey)





export default router