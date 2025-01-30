import e from 'express';
import { register } from '../controller/company.controller.js';
import { login } from '../controller/auth.controller.js';

const router = e.Router()

router.post("/register",register)
router.post("/login",login)

export default router;
