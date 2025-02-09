import express from 'express';
import { createJob, register } from '../controller/company.controller.js';
import { login } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/post-job", verifyToken, createJob);

export default router;
