import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GitHubStrategy } from 'passport-github2'; 
import User from '../models/user.model.js';

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Configure GitHub OAuth strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/github/callback', // Adjust to your environment
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in the database
                let user = await User.findOne({ githubId: profile.id });

                // If the user doesn't exist, create a new one
                if (!user) {
                    user = new User({
                        username: profile.username,
                        email: profile.emails[0].value, // Get the email
                        githubId: profile.id,
                        profilePicture: profile.photos[0].value, // Profile picture
                        accessToken: accessToken, // Save GitHub access token
                    });
                    await user.save();
                } else {
                    // If user exists, update the accessToken (in case it has changed)
                    user.accessToken = accessToken;
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// GitHub login route
export const githubLogin = passport.authenticate('github', {
    scope: ['user:email', 'repo'], // Ask for access to user's repositories
},async()=> {
    console.log("jfnsdkgj bwfrj")
});

// GitHub OAuth callback
export const githubCallback = passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/', // Redirect after successful login
});

// Logout route
export const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
