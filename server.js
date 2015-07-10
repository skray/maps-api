var restify = require('restify');
var fs = require('fs');

function listMaps(req, res) {
    fs.readdir('maps', function(err, files) {
        if(err) {
            throw err;
        }
        res.json(files);
    });
}

function showMap(req, res) {
    fs.readFile('maps/'+req.params.id, {encoding: 'UTF-8'}, function(err, data) {
        if(err) {
            throw err;
        }
        res.json(JSON.parse(data));
    });
}

function saveMap(req, res) {
    var map = JSON.parse(req.body)
    fs.writeFile('maps/'+map.fileName, req.body, function(err) {
        if(err) {
            throw err;
        }
    });
}

function updateMap(req, res, next) {
    var map = req.body;
    fs.writeFile('maps/'+req.params.id, JSON.stringify(map), function(err) {
        if(err) {
            return next(err);
        }
        res.send(req.body);
        next();
    });
}

// function delMap(req, res, next) {

// }

// function listMarkers(req, res) {
//     Marker.find(function (err, markers) {
//       if (err) return console.error(err);
//       res.json(markers);
//     });
// }

// function showMarker(req, res, next) {
//     Marker.findOne({'_id': req.params.id}, function(err, marker) {
//         res.json(marker);    
//     });  
// }

// function saveMarker(req, res, next) {
//     var marker = new Marker(req.body);
//     marker.save(function(err) {
//         res.json(201, marker);
//     });
// }

// function updateMarker(req, res, next) {
//     var marker = req.body;
//     Marker.findByIdAndUpdate(req.params.id, marker, function(err) {
//         res.json(200, marker);
//     });
// }

// function delMarker(req, res, next) {
//     var marker = req.body;
//     Marker.findByIdAndRemove(req.params.id, marker, function(err) {
//         res.json(200, marker);
//     });
// }

/** startup **/
// mongoose.connect('mongodb://localhost/maps');

var server = restify.createServer();
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser({ mapParams: false }));

server.get('/maps', listMaps);
server.get('/maps/:id', showMap);
server.post('/maps', saveMap);
server.put('/maps/:id', updateMap);
// server.del('/maps/:id', delMap)

// server.get('/maps/:id/markers', listMarkers);
// server.get('/maps/:id/markers/:id', showMarker);
// server.post('/maps/:id/markers', saveMarker);
// server.put('/maps/:id/markers/:id', updateMarker);
// server.del('/maps/:id/markers/:id', delMarker)

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});