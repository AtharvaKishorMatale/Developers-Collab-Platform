import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js"
import messageRoutes from "./routes/message.route.js"; // Import messages route

dotenv.config();

const app = express();
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
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('server working');
});
// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/gemini",); 
app.use("/api/user", userRoutes);
app.use("/api/post", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes); // Messages API

// // Serve static frontend files from client/dist
// app.use(express.static(path.join(__dirname, "../client/dist")));

// // Fallback for SPA routing
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
