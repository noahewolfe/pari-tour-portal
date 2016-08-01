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

// controllers ==================================
router.use('/test', require('./test'));

// index page
router.get('/', function (req, res) {
    res.render('pages/index');
});
/* Example for req.file (for an image)

{ fieldname: 'uploadedImage',
  originalname: 'titlshiftandromeda.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer:
   Buffer [
     255,
     216,
{ fieldname: 'uploadedImage',
  originalname: 'titlshiftandromeda.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer:
   Buffer [
     255,
     216,
*/

router.post('/', upload.single('images'), function (req, res) {
    var dirname = require('path').dirname(__dirname);
    console.log("DIR:" + dirname);
    var filename = req.file.filename;
    console.log("FILE:" + filename);
    var path = req.file.path;
    console.log("PATH:" + dirname);
    var type = req.file.mimetype;
    console.log("TYPE:" + type);

    //console.dir(req.body);
    //console.dir(req.file);
    var newPlace = new Place(req.body);
    newPlace.images.push(filename)
    console.log("IMAGES:" + newPlace.images);
    //newPlace.name = req.body.name;



    var writestream = GridFS.createWriteStream({
        filename: filename
    });
    fs.createReadStream(dirname + '/' + path).pipe(writestream);

    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
        fs.unlink(dirname + '/' + path, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("removed file at " + dirname + '/' + path);
            }
        })
        //newPlace.images.push(file.filename);
    });
    newPlace.save();
});

module.exports = router;
