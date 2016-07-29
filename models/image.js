var mongoose = require('mongoose');

// define the schema for our user model
var imageSchema = mongoose.Schema({
    ref          : String //make sure these are always unique!
});

//creating the model and exposing it to the app
module.exports = mongoose.model('DB_NAME', imageSchema);
