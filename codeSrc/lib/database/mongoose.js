const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}).then((resp) => {
    // console.log(resp);
    console.log(`Connected to the mongoDB database of inspecto.....`);
}).catch((erro) => {
    console.log(erro);
}) ;

module.exports = { mongoose };