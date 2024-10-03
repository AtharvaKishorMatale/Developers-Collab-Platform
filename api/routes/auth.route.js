import express from 'express';
import { google, Login, signup } from '../controllers/auth.controller.js';
import passport from 'passport'; // Import passport for GitHub OAuth
import '../config/passport.config.js'; // GitHub OAuth configuration

const router = express.Router();

router.post('/signup', signup);
router.post('/Login', Login);
router.post('/google', google);

// GitHub OAuth login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile'); // Redirect to profile on success
  }
);

// Protected route for profile
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`Hello, ${req.user.username}. This is your profile page!`);
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export default router;
