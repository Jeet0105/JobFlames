import express from 'express';
import { changeStatus, createJob, getApplicantsForJob, getMyJob, register } from '../controller/company.controller.js';
import { login, logout } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);
router.post("/post-job", verifyToken, createJob);
router.get("/get-my-job/:id",verifyToken,getMyJob);
router.get("/get-applicants/:id",verifyToken,getApplicantsForJob);
router.put("/update-status/:id",verifyToken,changeStatus);

export default router;
