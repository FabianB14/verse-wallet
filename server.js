const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Define CSP Header middleware
app.use((req, res, next) => {
  // Base CSP directives
  const cspDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://secure.walletconnect.org"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "blob:", "https://*"],
    'connect-src': [
      "'self'",
      "https://secure.walletconnect.org",
      "wss://relay.walletconnect.org",
      "wss://relay.walletconnect.com",
      "https://api.web3modal.com",
      "https://api.web3modal.org"
    ],
    'frame-src': [
      "'self'",
      "https://secure.walletconnect.org",
      "https://verify.walletconnect.org",
      "https://verify.walletconnect.com"
    ],
    'frame-ancestors': [
      "'self'",
      "http://localhost:*",
      "https://*.pages.dev",
      "https://*.vercel.app",
      "https://*.ngrok-free.app",
      "https://secure-mobile.walletconnect.com",
      "https://secure-mobile.walletconnect.org",
      "https://secure.walletconnect.org"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"]
  };

  // Convert directives object to string
  const cspString = Object.entries(cspDirectives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');

  // Set security headers
  res.setHeader('Content-Security-Policy', cspString);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Send index.html for any other requests (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});