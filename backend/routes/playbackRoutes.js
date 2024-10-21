const express = require('express');
const router = express.Router();
const { playFile } = require('../controllers/playbackController');

// Route to stream uploaded files
router.get('/play/:fileName', playFile);

module.exports = router;

