const mongoose = require('mongoose')

const dbConfig = "mongodb+srv://admin:35590097@crud.yddoyp8.mongodb.net/pdv?retryWrites=true&w=majority";

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;