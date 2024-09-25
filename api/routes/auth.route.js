import express from 'express';
import { google, Login, signup } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/Login', Login);
router.post('/google', google)

export default router;