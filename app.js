// libraries
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// local configuration
var configDB = require('./config/database.js');

var PORT = 8080;

// configuration ================================
// setup mongo db
mongoose.connect(configDB.url);

// setting up body-parser to let us access req.body information
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// set up controllers and routes (when looking in controllers, it defaults to getting the index.js)
app.use(require('./controllers'));

// listener =====================================
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
