const speech = require('@google-cloud/speech');
const fs = require('fs');

exports.transcribeAudio = async (filePath) => {
  const client = new speech.SpeechClient();

  const audio = {
    content: fs.readFileSync(filePath).toString('base64'),
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = { audio, config };

  const [response] = await client.recognize(request);
  const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
  
  return transcription;
};

