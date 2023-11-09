// Include the required modules and files
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const postRoutes = require('./routes.js');

const app = express();

// Middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use post routes for handling API requests
app.use(postRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});