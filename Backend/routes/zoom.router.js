import express from 'express';
import { getAuthorizedToken, createZoomMeeting } from '../controller/zoom.controller.js';

const router = express.Router();

router.get("/getAuthorization",getAuthorizedToken);
router.post("/create-zoom-meeting",createZoomMeeting);

export default router;