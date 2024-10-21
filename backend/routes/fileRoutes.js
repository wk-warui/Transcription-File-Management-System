const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

// File upload route
router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;

    // Acceptable file types
    const acceptableTypes = ['audio/mpeg', 'audio/wav', 'video/mp4', 'video/x-msvideo', 'video/quicktime'];
    
    if (!acceptableTypes.includes(file.mimetype)) {
        return res.status(400).send('File type not supported.');
    }

    // Move the file to the desired location
    const uploadPath = `uploads/${file.name}`;
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });
});

module.exports = router;

