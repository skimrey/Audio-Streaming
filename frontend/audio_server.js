const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: 'postgres://bubtrxjh:zzEdCEA7lXwGx7Aexz_XlHoqzmRan2K2@bubble.db.elephantsql.com:5432/bubtrxjh',
});
app.use(express.static('public'));
// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Update the path to your HTML file
});

app.get('/audio', async (req, res) => {
  const audioId = req.params.id;

  try {
    // Fetch audio data from your PostgreSQL database
    const result = await pool.query('SELECT audio_content FROM audio_metadata');

    if (result.rows.length === 0) {
      res.status(404).send('Audio not found');
      return;
    }

    // Get the audio content from the database
    const audioContent = result.audio_content;

    // Set the appropriate content type for audio
    res.set('Content-Type', 'audio/mpeg');

    // Send the audio content to the client
    res.send(audioContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/audio_list', async (req, res) => {
  try {
      // Fetch a list of audio metadata from your PostgreSQL database
      const result = await pool.query('SELECT id, title FROM audio_metadata');

      if (result.rows.length === 0) {
          res.status(404).send('Audio not found');
          return;
      }

      // Send the list of audio items as JSON
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/audio/:id', async (req, res) => {
  const audioId = req.params.id;

  try {
      // Fetch audio content from your PostgreSQL database based on the ID
      const result = await pool.query('SELECT audio_content FROM audio_metadata WHERE id = $1', [audioId]);

      if (result.rows.length === 0) {
          res.status(404).send('Audio not found');
          return;
      }

      // Get the audio content from the database
      const audioContent = result.rows[0].audio_content;

      // Set the appropriate content type for audio
      res.set('Content-Type', 'audio/mpeg');

      // Send the audio content to the client
      res.send(audioContent);
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});
