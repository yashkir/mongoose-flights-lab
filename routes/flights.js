var express = require('express');
var router = express.Router();

var flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.patch('/:id', flightsCtrl.patch);
router.delete('/:id', flightsCtrl.delete);
router.post('/', flightsCtrl.create);

module.exports = router;
