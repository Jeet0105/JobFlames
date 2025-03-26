import express from 'express';
import { getallinterviewer, updateInterviewer } from '../controller/interviewer.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { uploadMiddleware } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get("/getallinterviewers",verifyToken,getallinterviewer);
router.put("/updateInterviewer",verifyToken,uploadMiddleware,updateInterviewer);

export default router;