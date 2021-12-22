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

app.listen(config.port, () => {
    console.log("Application is running on Port " + config.port);
});

app.post('/api/currencies', (req, res) => {
    res.json(mock.currencies);
    //res.status(500).json(mock.error);
});

app.get('/api/bond-orders', (req, res) => {
    res.json(mock.getBondOrders);
    //res.status(500).json(mock.error);
});

app.post('/api/bond-orders', (req, res) => {
    res.json(mock.postBondOrders);
    //res.status(500).json(mock.error);
});

