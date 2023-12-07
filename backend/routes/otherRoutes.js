import express from "express";
import { contact, courseRequest, getDashboardStats } from "../controllers/otherControllers.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// contact
router.route("/contact").post(contact);

// course request
router.route("/courserequest").post(courseRequest);

// course request
router.route("/admin/stats").get(isAuthenticated, authorizeAdmin, getDashboardStats);





export default router;
 