import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createSubscription,getAllSubscription } from "../controller/Subscription.controller.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/create-subscription", verifyToken,uploadMiddleware, createSubscription);
router.get("/getAllSubscription",verifyToken,getAllSubscription);

export default router;