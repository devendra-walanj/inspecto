// Todo : Write Middleware authorisation person/user authenticator module to use in route middleware. 
const { authPerson } = require('./../lib/database/models/authpeople');

let authenticator = function (req, res, next) {
    let oToken = req.header("x-auth");
    console.log(oToken);
    
    authPerson.findPersonByToken(oToken).then((document) => {
        console.log(`authenticator : ${document}`);
        
        if (!document) {
            new Promise.reject();
        }
        req.token = oToken;
        next();
    }).catch((error) => {
        console.log(error);
        
        res.status(401).send(error);
    });
}

module.exports = { authenticator };

