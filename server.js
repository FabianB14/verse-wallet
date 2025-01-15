const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Add security headers
app.use((req, res, next) => {
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self' https://*.walletconnect.org https://*.walletconnect.com",
      "connect-src 'self' wss://*.walletconnect.org https://*.walletconnect.org https://*.walletconnect.com wss://*.walletconnect.com",
      "frame-src 'self' https://*.walletconnect.org https://*.walletconnect.com",
      "frame-ancestors 'self' http://localhost:* https://*.pages.dev https://*.vercel.app https://*.ngrok-free.app https://secure-mobile.walletconnect.com https://secure-mobile.walletconnect.org https://*.walletconnect.org",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.walletconnect.org",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*"
    ].join('; ')
  );

  // Additional security headers
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
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