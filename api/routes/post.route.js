// routes/projectRoutes.js

import express from 'express';
import { createProject } from '../controllers/post.controller.js';

console.log("Running in the routes")

const router = express.Router();

// @route   POST /api/post/create
// @desc    Create a new project
// @access  Public
router.post('/create', createProject);

export default router;