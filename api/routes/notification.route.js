// routes/notificationRoutes.js
import express from 'express';
import { sendJoinRequest, getNotifications } from '../controllers/notification.controller.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

router.post('/notifications', sendJoinRequest);
router.get('/getno', authenticateUser, getNotifications);

export default router;
