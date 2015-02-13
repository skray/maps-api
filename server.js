var restify = require('restify');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/maps');

var mapSchema = mongoose.Schema({
    name: String
});

var Map = mongoose.model('Map', mapSchema);

var markerSchema = mongoose.Schema({
    latLng: Array
});

var Marker = mongoose.model('Marker', markerSchema);



function listMaps(req, res) {
    Map.find(function (err, maplist) {
      if (err) return console.error(err);
      res.json(maplist);
    });
}

function showMap(req, res, next) {
    res.json({name: 'lewisandclark'});
    next();
}

function saveMap(req, res, next) {

}

function updateMap(req, res, next) {

}

function delMap(req, res, next) {

}

function listMarkers(req, res) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    Marker.find(function (err, markers) {
      if (err) return console.error(err);
      res.json(markers);
    });
}

function showMarker(req, res, next) {
    res.json({name: 'lewisandclark'});
    next();
}

function saveMarker(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var marker = new Marker(req.body);
    marker.save(function(err) {
        res.json(201, {message: "Success!"});
    });
}

function updateMarker(req, res, next) {

}

function delMarker(req, res, next) {

}

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));
server.get('/maps', listMaps);
server.get('/maps/:id', showMap);
server.post('/maps', saveMap);
server.put('/maps/:id', updateMap);
server.del('/maps/:id', delMap)

server.get('/markers', listMarkers);
server.get('/markers/:id', showMarker);
server.post('/markers', saveMarker);
server.put('/markers/:id', updateMarker);
server.del('/markers/:id', delMarker)

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});