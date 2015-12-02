var mongoose = require ('mongoose');

var DateSchema = new mongoose.Schema({
    year: String,
    month: String,
    day: String
});

mongoose.model('Date', DateSchema);