import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
dotenv.config();
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.route.js';
import projectRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'

const app = express();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();

// import cors from 'cors';
// app.use(cors({ origin: 'http://localhost:5173' }));


// Set up session for passport
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', projectRoutes);
app.use('/api/notifications', notificationRoutes);

// Serve static frontend files from client/dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.get('/new',(req,res)=>{
  res.send("Postman running");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
