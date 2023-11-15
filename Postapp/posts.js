// In-memory data storage for posts
let postsDB = [];

// Helper function to generate a unique ID for new posts
function generatePostID() {
    return Date.now();
}

// Retrieve all posts
function getAllPosts() {
    return postsDB;
}

// Create a new post
function addNewPost(title, description, author) {
    const post = { id: generatePostID(), title, description, author };
    postsDB.push(post);
    return post;
}

// Update an existing post
function modifyPost(id, updatedData) {
    const postIndex = postsDB.findIndex(p => p.id === id);
    if (postIndex < 0) return null;

    const updatedPost = { ...postsDB[postIndex], ...updatedData };
    postsDB[postIndex] = updatedPost;
    return updatedPost;
}

// Delete a post
function removePost(id) {
    const postIndex = postsDB.findIndex(p => p.id === id);

    if (postIndex < 0) return false;

    postsDB.splice(postIndex, 1);
    return true;
}

module.exports = {
    getAllPosts,
    addNewPost,
    modifyPost,
    removePost,
};