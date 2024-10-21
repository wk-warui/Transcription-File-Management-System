const express = require('express');
const router = express.Router();
const { saveTranscription } = require('../controllers/transcriptionController');

// Route to save transcription
router.post('/save', saveTranscription);

module.exports = router;

