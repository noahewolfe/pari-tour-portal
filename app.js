var express = require('express');
var app = express();

var PORT = 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
    //res.send("Hello world!");
});

// listener
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
