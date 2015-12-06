var mongoose = require ('mongoose');

var ArticleSchema = new mongoose.Schema({
    response: String,
    snippet: String,
    web_url: String,
});

mongoose.model('Article', ArticleSchema);