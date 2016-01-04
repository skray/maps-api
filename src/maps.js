var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('some maps');
});

module.exports = router;