var express = require('express');
var router = express.Router();

// db models ====================================
var Place = require('../models/place.js');

// controllers ==================================
// use format --> router.use('/test', require('./test'));

// index page
router.get('/', function (req, res) {
    res.render('pages/index');
});

router.post('/', function (req, res) {
    console.dir(req.body);
    var newPlace = new Place(req.body);
    newPlace.save();
})

module.exports = router;
