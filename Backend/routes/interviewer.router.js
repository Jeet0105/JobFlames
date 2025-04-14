import express from 'express';
import { getAllApplicantForInterview, getAllCompletedInterviews, getallinterviewer, getAllJobsForInterviewer, getAllMyScheduledInterview, updateInterviewer, updateInterviewStatus } from '../controller/interviewer.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { uploadMiddleware } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get("/getallinterviewers",verifyToken,getallinterviewer);
router.put("/updateInterviewer",verifyToken,uploadMiddleware,updateInterviewer);
router.get("/getAllJobsForInterviewer",verifyToken,getAllJobsForInterviewer);
router.get("/getAllApplicantForInterview/:id",verifyToken,getAllApplicantForInterview)
router.get("/getAllMyScheduledInterviews",verifyToken,getAllMyScheduledInterview)
router.put("/updateInterviewStatus/:id",verifyToken,updateInterviewStatus)
router.get("/getAllMyCompletedInterviews",verifyToken,getAllCompletedInterviews)

export default router;