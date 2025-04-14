import express from "express";
import { apply, handleStatusChange } from "../controller/application.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/apply/:job_id", verifyToken, apply);
router.put("/updateStatus",verifyToken,handleStatusChange)

export default router;