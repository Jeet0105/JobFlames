import express from "express";
import { register } from "../controller/JobSeeker.controller.js";
import { login } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
