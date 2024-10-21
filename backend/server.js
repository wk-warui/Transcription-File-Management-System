// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Adjust path as necessary
const fileRoutes = require('./routes/fileRoutes'); // For file management routes
const multer = require('multer'); // For handling file uploads
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create an instance of express
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Serve static files (if you need to serve uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
    }
});

const upload = multer({ storage });

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

// Call the connectDB function
connectDB();

// Define routes
app.use('/api/auth', authRoutes); // Mount the authentication routes
app.use('/api/files', fileRoutes); // Mount the file management routes

// Example route
app.get('/', (req, res) => {
    res.send("Welcome to the Transcription File Management System!");
});

// File upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

