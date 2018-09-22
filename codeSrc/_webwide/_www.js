/*
 * @author : Devendra Walanj
 * @purpose :  Creating the battles api for games of thrones.
**/

// load the config files and database from library
require('../../config/configload');
require('../lib/database/mongoose');

let express = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');
let path = require('path');

let PORT = process.env.PORT;
let app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${new Date()} => ${req.method} => route request for ${req.url}  `);
    next();
});

require('../routes/load.routes')(app);

app.get("/", (req, res) => {    
    console.log(path.join(__dirname + '/index.html'));
    
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get("*", (req, res) => {
    res.status(404).send("Route not supported.");
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})

module.exports = { 
    app 
};

