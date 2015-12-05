var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Date1 = mongoose.model('Date');
var Article1 = mongoose.model('Article');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/dates', function(req, res, next) {
  Date1.find(function(err, dates){
    if(err){ return next(err); }

    res.json(dates);
  });
});

router.post('/dates', function(req, res, next) {
  var date = new Date1(req.body);

  date.save(function(err, date){
    if(err){ return next(err); }

    res.json(date);
  });
});

router.get('/articles', function (req, res, next) {
  Article1.find(function(err, articles){
    if(err){return next(err); }
    
    res.json(articles);
  });
});

router.post('/articles', function (req, res, next) {
  var article = new Article1(req.body);
  
  article.save(function(err, article) {
    if(err) {return next (err);}
    res.json(article);
  });
  
});


// router.param('date', function(req, res, next, id) {
//   var query = Date1.findById(id);

//   query.exec(function (err, date){
//     if (err) { return next(err); }
//     if (!date) { return next(new Error('can\'t find post')); }

//     req.post = date;
//     return next();
//   });
// });

router.get('/dates/:date', function(req, res, next) {
  req.post.populate(function(err, date) {
    if (err) { return next(err); }

    res.json(date);
  });
});



module.exports = router;