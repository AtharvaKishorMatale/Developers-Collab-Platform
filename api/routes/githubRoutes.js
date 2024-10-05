import express from 'express';
import { getUserRepos } from '../controllers/githubController.js';
import { ensureAuthenticated } from '../middlewares/authMiddleware.js'; // Ensure user is logged in

const router = express.Router();

router.get('/user/repos', ensureAuthenticated, getUserRepos); // GitHub repos endpoint

export default router;
