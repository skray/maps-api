var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
    name: String
});

var Map = mongoose.model('Map', mapSchema);

module.exports.mapSchema = mapSchema;
module.exports.Map = Map;