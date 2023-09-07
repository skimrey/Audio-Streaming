const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/vercel', (req, res) => {
  res.json({ message: 'Hello from Vercel Express API!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});