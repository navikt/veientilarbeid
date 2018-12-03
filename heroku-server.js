const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/veientilarbeid', express.static(path.join(__dirname, 'build')));

app.get('/veientilarbeid', (req, res) => {
     res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('*', (req, res) => {
    res.redirect('/veientilarbeid');
});

app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
});