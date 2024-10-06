import express from 'express';
import { google, Login, signup, github } from '../controllers/auth.controller.js';
import { uploadProject } from '../controllers/project.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/Login', Login);
router.post('/google', google);
router.post('/github', github);
router.post('/upload-project', uploadProject);


export default router;
