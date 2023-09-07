const { Pool } = require('pg');

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: 'postgres://bubtrxjh:zzEdCEA7lXwGx7Aexz_XlHoqzmRan2K2@bubble.db.elephantsql.com:5432/bubtrxjh',
});

module.exports = async (req, res) => {
  const { id } = req.query; // Get the 'id' parameter from the query string

  try {
    // Fetch audio content from your PostgreSQL database based on the ID
    const result = await pool.query('SELECT audio_content FROM audio_metadata WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).send('Audio not found');
      return;
    }

    // Get the audio content from the database
    const audioContent = result.rows[0].audio_content;

    // Set the appropriate content type for audio
    res.setHeader('Content-Type', 'audio/mpeg');

    // Create a read stream from the audio content
    const audioStream = new Readable();
    audioStream._read = () => {}; // Dummy implementation required for Readable streams
    audioStream.push(audioContent);
    audioStream.push(null); // End the stream

    // Pipe the audio stream to the response object to stream the audio to the client
    audioStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};