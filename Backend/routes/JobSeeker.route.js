import express from "express";
import { getAllJobs, getJobDetail, register, updateJobSeekers } from "../controller/JobSeeker.controller.js";
import { login, logout } from "../controller/auth.controller.js";
import { verifyToken } from '../utils/verifyUser.js';
import {uploadMiddleware} from '../middleware/upload.middleware.js';


const router = express.Router();

router.post("/register", register);
router.get("/logout",logout);
router.post("/login", login);
router.get("/getalljobs",verifyToken,getAllJobs);
<<<<<<< HEAD
router.get("/getjobdetail/:id",verifyToken,getJobDetail)
=======
router.put("/updateJobSeeker",verifyToken,uploadMiddleware,updateJobSeekers);
router.get("/getjobdetail/:id",getJobDetail);
>>>>>>> ea27fa14160f05b6cadc2bef5c7fe7672bddeaa0

export default router;
