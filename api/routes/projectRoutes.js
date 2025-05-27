import express from 'express';
import Project from '../models/projectModel.js';


const router = express.Router();

// GET /api/projects/user?email=xyz@example.com
router.get('/user', async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const projects = await Project.find({ email }).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;
