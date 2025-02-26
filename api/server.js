import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import projectRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import { initializeSocket } from './controllers/socketController.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());

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
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
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

// Test route
app.get('/new', (req, res) => {
  res.send('Postman running');
});

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow frontend to connect
    methods: ['GET', 'POST'],
  },
});

// Initialize Socket.IO controller
initializeSocket(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});