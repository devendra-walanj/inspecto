
const { inpector } = require('../lib/database/models/inspecto');
const { authenticator } = require('../middleware/authenticator');
const _ = require('lodash');

module.exports = function (app) {

    //users POST
    app.post("/inspect", authenticator, (req, res) => {
        // let body = _.pick(req.body, ["email", "password"])
        let newInspectRec = new inpector(req.body);

        newInspectRec.save().then((document) => {
            console.log(`Saved Record : ${document}`);
            res.send('Record created for the inspection.');
        }).catch((err) => {
            console.error(`Inspect Post: ${err} `);
            return res.status(400).send(err);
        })

    });

    app.get("/inspect", authenticator, (req, res) => {
        console.log(JSON.stringify(req.query, undefined, 2));
        // let searchResult = {};

        inpector.find(req.query).then((searchResult) => {
            res.send(searchResult);

        }).catch((err) => {
            res.send(err);
        })        
    });
    // //users GET
    // app.get("/authPerson", authenticator, (req, res, next) => {

    //     authPerson.find({}).then((document) => {
    //         res.status(200).send({ "List User": document });
    //     }, (err) => {
    //         res.status(400).send(err);
    //     }).catch((err) => {
    //         res.status(400).send(err);
    //     })
    // });

    // //users/login POST
    // app.post("/authPerson/login", (req, res) => {
    //     var body = _.pick(req.body, ["email", "password"]);

    //     authPerson.findPersonByCredentials(body.email, body.password).then((authPerson) => {
    //         return authPerson.generateAuthenticationToken().then((oToken) => {
    //             return res.header("x-auth", oToken).send(authPerson);
    //         }, (error) => {
    //             return res.status(401).send(error);
    //         });
    //     }, (error) => {
    //         return res.status(401).send(error);
    //     }).catch((error) => {
    //         return res.status(500).send(error);
    //     })
    // });
}



