import express from "express";
import { getAllApplication, getAllCompany, getAllJobs, getAllUsers, getAppliedJobs, getJobDetail, register, registerInterviewer, updateJobSeekers } from "../controller/JobSeeker.controller.js";
import { login, logout } from "../controller/auth.controller.js";
import { verifyToken } from '../utils/verifyUser.js';
import {uploadMiddleware} from '../middleware/upload.middleware.js';


const router = express.Router();

router.post("/register", register);
router.get("/logout",logout);
router.post("/login", login);
router.get("/getalljobs",verifyToken,getAllJobs);
router.get("/getjobdetail/:id",verifyToken,getJobDetail)
router.put("/updateJobSeeker",verifyToken,uploadMiddleware,updateJobSeekers);
router.get("/getjobdetail/:id",verifyToken,getJobDetail);
router.get("/getappiedjob",verifyToken,getAppliedJobs);
//Only admin routes
router.post("/registerinterviewer",verifyToken,registerInterviewer);
router.get("/getallcompanies",verifyToken,getAllCompany);
router.get("/getallusers",verifyToken,getAllUsers);
router.get("/getallapplication",verifyToken,getAllApplication);

export default router;
