const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing request body
app.use(express.json());

// Route dasar untuk homepage
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route lain sebagai contoh
app.get('/about', (req, res) => {
  res.send('About Page');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
