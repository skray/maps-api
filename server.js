var restify = require('restify');
var mongoose = require('mongoose');
var Map = require('./models/map');
var Marker = require('./models/marker');

function listMaps(req, res) {
    Map.find(function (err, maplist) {
      if (err) return console.error(err);
      res.json(maplist);
    });
}

function showMap(req, res, next) {
    Map.findOne({'_id': req.params.id}, function(err, map) {
        res.json({name: 'lewisandclark'});    
    });    
}

function saveMap(req, res, next) {

}

function updateMap(req, res, next) {

}

function delMap(req, res, next) {

}

function listMarkers(req, res) {
    Marker.find(function (err, markers) {
      if (err) return console.error(err);
      res.json(markers);
    });
}

function showMarker(req, res, next) {
    Marker.findOne({'_id': req.params.id}, function(err, marker) {
        res.json(marker);    
    });  
}

function saveMarker(req, res, next) {
    var marker = new Marker(req.body);
    marker.save(function(err) {
        res.json(201, marker);
    });
}

function updateMarker(req, res, next) {
    var marker = req.body;
    Marker.findByIdAndUpdate(req.params.id, marker, function(err) {
        res.json(200, marker);
    });
}

function delMarker(req, res, next) {
    var marker = req.body;
    Marker.findByIdAndRemove(req.params.id, marker, function(err) {
        res.json(200, marker);
    });
}

/** startup **/
mongoose.connect('mongodb://localhost/maps');

var server = restify.createServer();
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser({ mapParams: false }));

server.get('/maps', listMaps);
server.get('/maps/:id', showMap);
server.post('/maps', saveMap);
server.put('/maps/:id', updateMap);
server.del('/maps/:id', delMap)

server.get('/maps/:id/markers', listMarkers);
server.get('/maps/:id/markers/:id', showMarker);
server.post('/maps/:id/markers', saveMarker);
server.put('/maps/:id/markers/:id', updateMarker);
server.del('/maps/:id/markers/:id', delMarker)

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});