var mongoose = require ('mongoose');

var ArticleSchema = new mongoose.Schema({
    snippet: String,
    web_url: String,
});

mongoose.model('Article', ArticleSchema);