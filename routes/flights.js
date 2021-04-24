var express = require('express');
var router = express.Router();

var flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);

module.exports = router;
