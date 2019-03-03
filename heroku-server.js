const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
});