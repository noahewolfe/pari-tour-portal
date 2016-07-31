var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    name          : String,
    description   : String,
    images        : [String]
});

// define the schema for our location model
var placeSchema = mongoose.Schema({
    name          : String,
    description   : String,
    coordinates   : [Number],
    items         : [itemSchema],
    images        : [String]
});

// creating the model and exposing it to the app
// the first argument is the singular version of the plural collection name (e.g. using 'Place' for the 'Places' collection)
module.exports = mongoose.model('Place', placeSchema);
