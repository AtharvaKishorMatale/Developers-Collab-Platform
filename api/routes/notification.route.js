// routes/notificationRoutes.js
import express from 'express';
import { sendJoinRequest } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/notifications', sendJoinRequest);

export default router;
