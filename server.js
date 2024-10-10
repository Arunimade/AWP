const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Blog:8december2003@blog.cewo1.mongodb.net/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Blog schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Blog = mongoose.model('Blog', blogSchema);

// Add blog endpoint
app.post('/add-blog', async (req, res) => {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content });
    
    try {
        await newBlog.save();
        res.status(201).json({ message: 'Blog added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving blog' });
    }
});

// Get blogs endpoint
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
