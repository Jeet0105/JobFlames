import express from "express";
import { apply } from "../controller/application.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/apply/:job_id", verifyToken, apply);

export default router;