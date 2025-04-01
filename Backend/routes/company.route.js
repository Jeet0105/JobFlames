import express from 'express';
import { createJob, register, updateCompany } from '../controller/company.controller.js';
import { changeStatus, getApplicantsForJob, getMyJob } from '../controller/company.controller.js';
import { login, logout } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { uploadMiddleware } from '../middleware/upload.middleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);
router.post("/post-job", verifyToken, createJob);
router.put("/updateCompany", verifyToken, uploadMiddleware, updateCompany);
router.get("/get-my-job/:id",verifyToken,getMyJob);
router.get("/get-applicants/:id",verifyToken,getApplicantsForJob);
router.put("/update-status/:id",verifyToken,changeStatus);

export default router;
