// DB Model for mongoDB for user authentication and creation 
let mongoose = require('mongoose');
let bcrypto = require('bcryptjs');
let validator = require('validator');
let oJWT = require('jsonwebtoken');
let _ = require('lodash');

// Add schema so schema methods can be added.
let authPersonSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        minlength: 1,
        unique: [true, "Email already registered."],
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} not a valid email."
        },
        trim: true
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
    }
});

authPersonSchema.methods.toJSON = function () {
    var authPerson = this.toObject();
    return _.pick(authPerson, [ "_id", "email" ])
}

authPersonSchema.methods.generateAuthenticationToken = function ()   {
    let authPerObj = this;
    let access = "auth";
    let token;

    return new Promise((resolve, reject) => {
        token = oJWT.sign({
            _id: authPerObj._id.toHexString(),
            access
        }, process.env.SECRET_PHRASE_JWT
            // , { sessexpiresIn: 106400 }
        ).toString();
        console.log(`token : ${token}`);
        
        resolve(token)
    });
}

authPersonSchema.statics.findPersonByToken = function (oToken) {
    let verifiedDecoded;    

    // Verify and decode the passed generated token from the generateAuthenticationToken method
    try {
        verifiedDecoded = oJWT.verify(oToken, process.env.SECRET_PHRASE_JWT);
    } catch (error) {
        console.error(error);           
        return Promise.reject('Authentication Token not a match');
    }

    return Promise.resolve({
        _id: verifiedDecoded._id,
        "token": oToken,
        "access": "auth"
    });
}

authPersonSchema.pre("save", function (next) {
    var authPerson = this;

    if (authPerson.isModified("password")) {
        var p1 = bcrypto.genSalt(10, (err, salt) => {
            var p1 = bcrypto.hash(authPerson.password, salt, (err, hash) => {
                authPerson.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

authPersonSchema.statics.findPersonByCredentials = function (oEmail, oPassword) {
    var authPerson = this;
    console.log(`findByCredence => oEmail : ${oEmail} `);
    
    return authPerson.findOne({ 'email': oEmail }).then((aPerson) => {
        console.log(`findByCredence => aPerson :  ${aPerson} `);
        if (!aPerson) {
            return Promise.reject('User not found');
        }

        return new Promise((resolve, reject) => {
            bcrypto.compare(oPassword, aPerson.password, (err, res) => {
                if (res) {
                    resolve(aPerson);
                } else {
                    console.log(err);
                    reject('');
                }
            });
        });
    });
};


let authPerson = mongoose.model("authPeople", authPersonSchema);

module.exports = { 
    authPerson,
    mongoose 
};