const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// Set up a storage engine for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

// Handle audio file uploads
app.post('/upload', upload.single('audioFile'), (req, res) => {
  // Handle file upload and store it (in memory for simplicity)
  const audioFile = req.file;
  if (!audioFile) {
    return res.status(400).send('No audio file uploaded.');
  }

  // You can save the audioFile.buffer to a storage solution (e.g., Amazon S3, Google Cloud Storage)

  res.status(200).send('Audio file uploaded.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
