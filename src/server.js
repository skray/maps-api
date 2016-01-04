var express = require('express');
var app = express();

var mapRoutes = require('./maps');

app.use('/maps', mapRoutes);

var server = app.listen(8000, function () {
  console.log('maps-api listening at http://%s:%s', server.address().address, server.address().port);
});