require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const cors = require('cors');
// const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT =process.env.PORT || 3001//5011; //process.env.PORT || 3000; // Use the PORT from .env filecd
// console.log(process.env.ENCRYPTION_KEY);
app.use(cors());

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
// const IV_LENGTH = 16; // For AES, this is always 16

// if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
//   throw new Error('Encryption key must be 32 characters long');
// }

// Set up static folder for serving CSS, JS, and other static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pictures', express.static(path.join(__dirname, '/pictures')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  '/jquery',
  express.static(path.join(__dirname, 'node_modules', 'jquery'))
);
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, 'node_modules', 'bootstrap'))
);

app.use(
  '/sweetalert2',
  express.static(path.join(__dirname, 'node_modules', 'sweetalert2'))
);

app.use(
  '/qrcodejs_manual',
  express.static(path.join(__dirname, 'qrcodejs_manual'))
);

app.use(
  '/axios',
  express.static(path.join(__dirname, 'node_modules', 'axios'))
);


const router_MTP = require('./routes/mtpSmartProgressRoute');
app.use('/mtp', router_MTP);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/mtp`);
});
