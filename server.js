require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const loginRoutes = require('./routes/loginRoutes');
const bookRoutes = require('./routes/BookRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api', loginRoutes);
app.use('/api', bookRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
