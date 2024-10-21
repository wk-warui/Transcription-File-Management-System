const multer = require('multer');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in uploads folder
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName); // Custom file name with timestamp
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept only audio and video files
        if (file.mimetype.startsWith('audio') || file.mimetype.startsWith('video')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only audio and video files are allowed'), false);
        }
    }
});

// File upload handler
exports.uploadFile = (req, res) => {
    try {
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.upload = upload;

