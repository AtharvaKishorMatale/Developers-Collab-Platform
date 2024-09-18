import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
