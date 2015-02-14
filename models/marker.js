var mongoose = require('mongoose');

var markerSchema = mongoose.Schema({
    mapId: mongoose.Schema.Types.ObjectId,
    title: String,
    date: String,
    latLng: Array,
    description: String
});

var Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;