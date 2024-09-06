const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
