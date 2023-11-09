const express = require('express');
const router = express.Router();
const { getAllPosts, addNewPost, modifyPost, removePost } = require('./posts.js');

// API route for fetching all posts
router.get('/api/posts', (req, res) => {
    const posts = getAllPosts();
    res.json(posts);
});

// API route for creating a new post
router.post('/api/posts', (req, res) => {
    const { title, description, author } = req.body;
    const post = addNewPost(title, description, author);
    res.json(post);
});

// API route for updating an existing post
router.put('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedPostData = req.body;
    const updatedPost = modifyPost(id, updatedPostData);

    if (updatedPost) {
        res.json(updatedPost);
    } else {
        res.status(404).send({ error: 'Post not found' });
    }
});

// API route for deleting a post
router.delete('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deleted = removePost(id);

    if (deleted) {
        res.json({ success: true });
    } else {
        res.status(404).send({ error: 'Post not found' });
    }
});

module.exports = router;