import express from "express";
import { getAllJobs, getJobDetail, register } from "../controller/JobSeeker.controller.js";
import { login, logout } from "../controller/auth.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/register", register);
router.get("/logout",logout);
router.post("/login", login);
router.get("/getalljobs",verifyToken,getAllJobs);
router.get("/getjobdetail/:id",verifyToken,getJobDetail)

export default router;
