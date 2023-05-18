const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/logs', (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const logEntry = JSON.parse(body);

    fs.appendFileSync('Hamle.txt', logEntry + '\n');

    res.sendStatus(200);
  });
});

app.get('/clear-logs', (req, res) => {
  fs.writeFileSync('Hamle.txt', '');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
