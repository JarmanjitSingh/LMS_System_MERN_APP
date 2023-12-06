import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubscription } from "../controllers/paymentController.js";

const router = express.Router();

//Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription)



export default router