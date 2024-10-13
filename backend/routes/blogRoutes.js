// routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Route to create a blog post
router.post('/', blogController.createBlog);

// Route to get all blog posts
router.get('/', blogController.getAllBlogs);

module.exports = router;
