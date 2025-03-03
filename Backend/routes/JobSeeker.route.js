import express from "express";
import { getAllJobs, register } from "../controller/JobSeeker.controller.js";
import { login, logout } from "../controller/auth.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/register", register);
router.get("/logout",logout);
router.post("/login", login);
router.get("/getalljobs",verifyToken,getAllJobs);

export default router;
