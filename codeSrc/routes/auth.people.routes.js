// File to routes the authenitcation people.
// Todo : JWT to use
// Todo : added token verification at middleware ...
const { authPerson } = require('../lib/database/models/authpeople');
const { authenticator } = require('../middleware/authenticator');
const _ = require('lodash');

module.exports = function (app) {

    //users POST
    app.post("/authPerson", (req, res) => {

        let body = _.pick(req.body, ["email", "password"])
        let newAuthPerson = new authPerson(body);

        newAuthPerson.save().then((document) => {
            // res.send(document);
            // console.log(`.save : ${JSON.stringify(document)}`);            
            return newAuthPerson.generateAuthenticationToken();
        }, (error) => {
            // console.log(req);
            res.status(400).send(error);
        }).then((oToken) => {
            // console.log(`Generated Token : ${oToken} `);
            return res.header("x-auth", oToken).send(newAuthPerson);
        }).catch((error) => {
            console.error(`Auth Post: ${error} `);
            return res.status(400).send(error);
        })

    });

    //users GET
    app.get("/authPerson", authenticator, (req, res, next) => {

        authPerson.find({}).then((document) => {
            res.status(200).send({"List User": document});
        }, (err) => {
            res.status(400).send(err);
        }).catch((err) => {
            res.status(400).send(err);
        })
    });

    //users/login POST
    app.post("/authPerson/login", (req, res) => {
        var body = _.pick(req.body, ["email", "password"]);

        authPerson.findPersonByCredentials(body.email, body.password).then((authPerson) => {
            return authPerson.generateAuthenticationToken().then((oToken) => {
                return res.header("x-auth", oToken).send(authPerson);
            }, (error) => {
                return res.status(401).send(error);
            });
        }, (error) => {
            return res.status(401).send(error);
        }).catch((error) => {
            return res.status(500).send(error);
        })
    });
}



