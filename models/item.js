var mongoose = require('mongoose');

// define the schema for our user model
var itemSchema = mongoose.Schema({
    name          : String,
    description   : String,
    images        : [Image],
});

//creating the model and exposing it to the app
module.exports = mongoose.model('DB_NAME', itemSchema);
