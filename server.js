var restify = require('restify');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/maps');

var mapSchema = mongoose.Schema({
    name: String
});

var Map = mongoose.model('Map', mapSchema);

function list(req, res, next) {

    Map.find(function (err, maplist) {
      if (err) return console.error(err);
      res.json(maplist);
    });
    
    // next();
}

function show(req, res, next) {
    res.json({name: 'lewisandclark'});
    next();
}

function save(req, res, next) {

}

function update(req, res, next) {

}

function del(req, res, next) {

}

var server = restify.createServer();
server.get('/maps', list);
server.get('/maps/:id', show);
server.post('/maps', save);
server.put('/maps/:id', update);
server.del('/maps/:id', del)

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});