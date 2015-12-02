var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Date1 = mongoose.model('Date');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/dates', function(req, res, next) {
  Date1.find(function(err, date){
    if(err){ return next(err); }

    res.json(date);
  });
});

module.exports = router;