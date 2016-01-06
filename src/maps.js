var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

var sequelize = new Sequelize('mydb', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Map = sequelize.define('map', {
    name: {
        type: Sequelize.STRING
    }
});

router.get('/', function(req, res) {
    Map.findAll().then(function(maps) {
        res.json(maps);
    });
});

router.post('/', function(req, res) {
    Map.create(req.body).then(function(map) {
        res.status(201).json(map);
    });
});



module.exports = router;