const express = require("express");
const app = express();
const path = require("path");
const config = require('../config.json');
const mock = require('../mock.json');

//GitHub testing

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.post('/addneworder', (req, res) => {
    res.json(mock.addneworder);
});

app.listen(config.port, () => {
    console.log("Application is running on Port " + config.port);
});

app.post('/getcurrencies', (req, res) => {
    res.json(mock.currencies);
});