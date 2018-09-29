const { mConnection, mySQL } = require('../lib/database/mySQL');
const { authenticator } = require('../middleware/authenticator');
const _ = require('lodash');

module.exports = function (app) {
    // Insert Inspection record
    app.post("/inspect", authenticator, (req, res) => {
        // let body = _.pick(req.body, ["email", "password"])
        let iData = {},
            isql = 'insert into inspection SET ?' ;
        
        if (Object.keys(req.body).length = 0) {
            console.error(`No data to insert.`);            
            res.send('No data to insert.').status(404);
        }
        // Object.keys(req.body).forEach((element) => {
        //     // To avoid SQL Injection
        //     // iData[element] = mySQL.escape(req.body[element]);
        //     iData[element] = req.body[element];
        // })
        iData = req.body;
        console.log(`iData : ${JSON.stringify(iData, undefined, 2)}`);

        // Sending query in a prepared statement where connection.query api iternally takes care for SQL injection.
        mConnection.query(isql, iData, (err, result) => {
            if (err) {
                console.log(`Error Occured : ${err}`);
                res.send(err).status(400);
            } else {
                console.log(`Record added successfully : ${JSON.stringify(result)}`)
                res.send('Record added successfully.').status(200);
            }
        } )
    });

    app.get("/inspect", authenticator, (req, res) => {
        // console.log(JSON.stringify(req.query, undefined, 2));
        // let searchResult = {};
        let isql =  `select * from inspection `;
        let searchClause = ``;  

        if (Object.keys(req.query).length > 0) {
            isql += ' where 1 = 1 ';
            Object.keys(req.query).forEach((element) => {
                // To avoid SQL Injection
                let value = mySQL.escape(req.query[element]);
                // console.log(`value.indexOf('%') = ${value.indexOf('%')}`);
                // console.log(`value.length = ${value.length}`);
                // console.log(`value = ${value}`);
                
                if (value.indexOf('%') === value.length - 2 || value.indexOf('%') === 1 ) {
                    searchClause += ` and ${element} like ${mySQL.escape(req.query[element]) }`;                    
                    
                } else {
                    searchClause += ` and ${element} = ${mySQL.escape(req.query[element]) }`;                    
                }
            });
            isql += searchClause;
        }
        // console.log(`isql => ${isql}`);
        mConnection.query(isql, (err, result) => {
            if (err) {
                console.log(`Error Occured : ${err}`);
                res.send(err).status(400)
                
            } else {
                console.log(`result : ${result}`);
                res.send(result);
            }
        });
    });

}



