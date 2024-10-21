const File = require('../models/File');
const { transcribeAudio } = require('../utils/googleSpeech');
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadPath = path.join(__dirname, '../uploads/', file.name);
    
    await file.mv(uploadPath);
    
    const transcription = await transcribeAudio(uploadPath);

    const newFile = new File({
      fileName: file.name,
      transcription,
      user: req.user,
    });
    await newFile.save();

    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ message: 'File upload failed' });
  }
};

const Transcription = require('../models/Transcription');
// Save transcription
exports.saveTranscription = async (req, res) => {
    try {
        const { fileId, transcriptionText } = req.body;

        // Save transcription linked to the file
        const transcription = new Transcription({
            fileId,
            transcriptionText,
        });

        await transcription.save();
        res.status(201).json({ message: 'Transcription saved successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
