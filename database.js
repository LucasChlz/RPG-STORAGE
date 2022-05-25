require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.URI_DB

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;  