const express = require("express");
const serverless = require("serverless-http");

// Create an instance of the Express app
const app = express();
const pool = new Pool({
  connectionString: 'postgres://bubtrxjh:zzEdCEA7lXwGx7Aexz_XlHoqzmRan2K2@bubble.db.elephantsql.com:5432/bubtrxjh',
});
// Create a router to handle routes
const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
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
// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);
