var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); //this is a singleton, so it is the same instance that we created in app.js
var Grid = require('gridfs-stream');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);

var multer = require('multer');
var upload = multer({dest: './uploads/'});

var fs = require('fs');

// db models ====================================
var Place = require('../models/place.js');

// test page
router.get('/', function (req, res) {
    var img;
    process.nextTick(function() {
        Place.findOne({ name: "newOne9" }, function(err, doc) {
            //console.log(doc);
            GridFS.findOne({filename: doc.images[0]}, function(err, file) {
                if (err) {
                    res.json(err);
                }
                if (file) {
                    //console.log(file);
                    var mime = 'image/jpeg';
                    res.set('Content-Type', mime);
                    var read_stream = GridFS.createReadStream({filename: file.filename});
                    read_stream.pipe(res);
                } else {
                    res.json('File Not Found');
                }

           });
        });
    });

});

module.exports = router;
