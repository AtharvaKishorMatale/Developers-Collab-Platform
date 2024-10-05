import express from 'express';
import { google, Login, signup, github } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/Login', Login);
router.post('/google', google);
router.post('/github', github); // Redirect to GitHub login


export default router;
