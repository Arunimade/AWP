// index.js
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Database connection
const blogRoutes = require('./routes/blogRoutes'); // Routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); // To parse JSON requests

// Use Routes
app.use('/api/blogs', blogRoutes); // Blog routes

// Define a static HTML page
app.use(express.static('frontend'));

// Set up the server
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
