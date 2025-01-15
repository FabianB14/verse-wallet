const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve environment variables to the client
app.get('/env-config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.ENV = {
    REACT_APP_VERSE_API_URL: '${process.env.REACT_APP_VERSE_API_URL}',
    REACT_APP_WALLET_CONNECT_PROJECT_ID: '${process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID}',
    REACT_APP_VERSE_CHAIN_ID: '${process.env.REACT_APP_VERSE_CHAIN_ID}',
    REACT_APP_API_KEY: '${process.env.REACT_APP_API_KEY}'
  };`);
});

// Send index.html for any other requests (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});