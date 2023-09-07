// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from 'express';
import serverless from 'serverless-http';
const { Pool } = require('pg');
const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

const pool = new Pool({
  connectionString: 'postgres://bubtrxjh:zzEdCEA7lXwGx7Aexz_XlHoqzmRan2K2@bubble.db.elephantsql.com:5432/bubtrxjh',
});

router.get('audio/:id', async (req, res) => {
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
api.use('/api/', router);

export const handler = serverless(api);
