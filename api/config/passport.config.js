import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GitHubStrategy } from 'passport-github2'; // Import GitHubStrategy
import User from '../models/user.model.js'; // Import User model

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// GitHub OAuth strategy configuration
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL, // Use environment variable for callback
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in the database
    let user = await User.findOne({ githubId: profile.id });

    if (!user) {
      // Create new user if they don't exist
      user = new User({
        username: profile.username || profile.displayName, // Use displayName as a fallback for username
        email: profile.emails.length > 0 ? profile.emails[0].value : null, // Check for available emails
        githubId: profile.id,
        profilePicture: profile.photos.length > 0 ? profile.photos[0].value : undefined, // Use GitHub photo if available
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    console.error("Error during GitHub authentication:", error); // Log error
    return done(error, null);
  }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});


// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error); // Log error
    done(error, null);
  }
});

export default passport;
