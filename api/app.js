import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2'; // ES module import for GitHubStrategy


const app = express();

// GitHub OAuth credentials
const GITHUB_CLIENT_ID = 'Ov23limho1w3i5C828xL'; // Replace with your GitHub Client ID
const GITHUB_CLIENT_SECRET = '1210da906e29207ee57ee603541ef83dcfafc872';

// Passport configuration for GitHub OAuth
passport.use(new GitHubStrategy({
    clientID:  GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // You can integrate a database here to store user information
    return done(null, profile);
  }
));

// Serialize user information to store in session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user information from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Middleware
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Route for GitHub login
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub OAuth callback route
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// Profile route (protected)
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send(`Hello, ${req.user.username}. This is your profile page!`);
});

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><a href="/auth/github">Login with GitHub</a>');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// client/src/App.js
