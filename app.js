// libraries
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// local configuration
var configDB = require('./config/database.js');

// db models
var Place = require('./models/place.js');

var PORT = 8080;

// configuration ================================
// setup mongo db
mongoose.connect(configDB.url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});
app.post('/', function (req, res) {
    console.dir(req.body);
    var newPlace = new Place(req.body);
    newPlace.save();
})

// listener
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
