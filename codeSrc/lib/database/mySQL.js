const mySQL = require('mysql');

let mConnection = mySQL.createConnection({
    "host": process.env.mysql_host,
    "user": process.env.mysql_user,
    "password": process.env.mysql_password,
    "database": process.env.mysql_database
});

mConnection.connect((err) => {
    if (err) {
        console.log(`Error connecting mySQL: ${err}`);        
    } else {
        console.log('mySQL database connected');        
    }
});


module.exports = {
    mConnection,
    mySQL
};