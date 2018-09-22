// File to load the added routes automatically
const oFS = require("fs");
var _ = require("lodash");
const { ObjectID } = require("mongodb");

module.exports = function (app) {
    oFS.readdirSync(__dirname).forEach(function (file) {
        if (file === "load.routes.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')   {
            return;
        }        
        console.log(`Locading Routes : `);
        var fileName = file;
        try {
            require('./' + fileName)(app);
            // console.log('../' + name + " loaded.");
        } catch (error) {
            console.log("Exception occured while loading route file '" + fileName + "' " + error.message)
        }
    });
}