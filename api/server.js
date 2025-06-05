import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import githubAuthRoutes from "./routes/github.routes.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import projectsdisplay from "./routes/projectRoutes.js";
import projectRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js"
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'https://developers-collab-platform-1.onrender.com',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Set up session for passport
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Helper function for Jaccard similarity
function calculateJaccardSimilarity(setA, setB) {
  const intersectionSize = [...setA].filter(x => setB.has(x)).length;
  const unionSize = new Set([...setA, ...setB]).size;
  return unionSize === 0 ? 0 : intersectionSize / unionSize;
}

app.get('/', (req, res) => {
  res.send('server working');
});

// --------- Recommendations routes directly here ---------

// Recommend projects for a user
app.get('/flask/projects/recommendations/:user_id', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const userId = req.params.user_id;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const user = await db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(userId) });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const userSkills = new Set(user.skills || []);
    const userProjectsCursor = db.collection('userProjects').find({ email: user.email });

    await userProjectsCursor.forEach(proj => {
      if (proj.language) userSkills.add(proj.language);
    });

    const allProjects = await db.collection('posts').find().toArray();

    const recommendations = allProjects.map(proj => {
      const projectSkills = new Set([...(proj.skills || []), ...(proj.technologies || [])]);
      const similarity = calculateJaccardSimilarity(userSkills, projectSkills);
      return { projectId: proj._id.toString(), similarity };
    });

    recommendations.sort((a, b) => b.similarity - a.similarity);
    const topFive = recommendations.slice(0, 5);

    const projectDetails = await Promise.all(
      topFive.map(async ({ projectId }) => {
        const p = await db.collection('posts').findOne({ _id: new mongoose.Types.ObjectId(projectId) });
        if (!p) return null;
        return {
          id: p._id.toString(),
          title: p.title,
          description: p.description,
          technologies: p.technologies,
          skills: p.skills,
          ownerUsername: p.ownerUsername,
          ownerPic: p.ownerPic,
          slug: p.slug
        };
      })
    );

    res.json(projectDetails.filter(Boolean));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all posts by username
app.get('/flask/posts/user/:ownerUsername', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const posts = await db.collection('posts').find({ ownerUsername: req.params.ownerUsername }).toArray();
    const formattedPosts = posts.map(post => ({
      id: post._id.toString(),
      title: post.title,
      description: post.description,
      requiredSkills: post.requiredSkills || [],
      ownerUsername: post.ownerUsername
    }));
    res.json(formattedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Recommend users for a post
app.get('/flask/users/recommendations/post/:post_id', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const postId = req.params.post_id;
    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ error: 'Invalid post ID' });

    const post = await db.collection('posts').findOne({ _id: new mongoose.Types.ObjectId(postId) });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const postSkills = new Set([...(post.skills || []), ...(post.technologies || [])]);
    const allUsers = await db.collection('users').find().toArray();

    const recommendations = await Promise.all(
      allUsers.map(async user => {
        const userSkills = new Set(user.skills || []);
        const userProjectsCursor = db.collection('userProjects').find({ email: user.email });

        await userProjectsCursor.forEach(proj => {
          if (proj.language) userSkills.add(proj.language);
        });

        const similarity = calculateJaccardSimilarity(userSkills, postSkills);
        return { userId: user._id.toString(), similarity };
      })
    );

    recommendations.sort((a, b) => b.similarity - a.similarity);
    const topFive = recommendations.slice(0, 5);

    const userDetails = await Promise.all(
      topFive.map(async ({ userId }) => {
        const user = await db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(userId) });
        if (!user) return null;
        return {
          id: user._id.toString(),
          username: user.username,
          profilePicture: user.profilePicture,
          email: user.email,
          skills: user.skills
        };
      })
    );

    res.json(userDetails.filter(Boolean));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------

// Existing routes below
app.use("/api/auth", authRoutes);
app.use('/api/github', githubAuthRoutes);
app.use('/api/projects', projectsdisplay);
app.use("/api/user", userRoutes);
app.use("/api/post", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
