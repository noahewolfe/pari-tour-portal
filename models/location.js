var mongoose = require('mongoose');

// define the schema for our user model
var locationSchema = mongoose.Schema({
    name          : String,
    description   : String,
    items         : [Item],
    coordinates   : [Number],
    images        : [Image]
});

//creating the model and exposing it to the app
module.exports = mongoose.model('DB_NAME', locationSchema);
