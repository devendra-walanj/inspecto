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

process.on('uncaughtException', (err) => {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    mConnection.end((err) => {
        if (err) {
            console.log(`Error Occured on connection end : ${err}`);
        }
    });
    mySQL.end((err) => {
        if (err) {
            console.log(`Error Occured on connection end : ${err}`);
        }
    });
    process.exit(1)
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})

module.exports = { 
    app 
};

