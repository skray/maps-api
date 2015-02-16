var mongoose = require('mongoose');

var markerSchema = mongoose.Schema({
    mapId: mongoose.Schema.Types.ObjectId,
    title: String,
    date: String,
    latitude: Number,
    longitude: Number,
    description: String
});

var Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;