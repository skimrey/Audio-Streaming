const { Pool } = require('pg');

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: 'postgres://bubtrxjh:zzEdCEA7lXwGx7Aexz_XlHoqzmRan2K2@bubble.db.elephantsql.com:5432/bubtrxjh',
});

module.exports = async (req, res) => {
  const { id } = req.query; // Vercel handles query parameters differently

  try {
    // Fetch audio content from your PostgreSQL database based on the ID
    const result = await pool.query('SELECT audio_content FROM audio_metadata WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Audio not found');
    }

    // Get the audio content from the database
    const audioContent = result.rows[0].audio_content;

    // Set the appropriate content type for audio
    res.setHeader('Content-Type', 'audio/mpeg');

    // Send the audio content to the client
    return res.send(audioContent);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};
