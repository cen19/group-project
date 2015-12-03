var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Date1 = mongoose.model('Date');


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


router.param('date', function(req, res, next, id) {
  var query = Date1.findById(id);

  query.exec(function (err, date){
    if (err) { return next(err); }
    if (!date) { return next(new Error('can\'t find post')); }

    req.post = date;
    return next();
  });
});

router.get('/datess/:date', function(req, res, next) {
  req.post.populate(function(err, date) {
    if (err) { return next(err); }

    res.json(date);
  });
});



module.exports = router;