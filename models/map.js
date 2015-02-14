var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
    name: String,
    center: Array,
    initialZoom: Number
});

var Map = mongoose.model('Map', mapSchema);

module.exports = Map;