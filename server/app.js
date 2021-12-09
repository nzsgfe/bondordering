const express = require("express");
const app = express();
const path = require("path");
const config = require('../config.json');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(config.port, () => {
    console.log("Application is running on Port " + config.port);
});