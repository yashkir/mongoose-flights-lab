var Flight = require("../models/flight");

function index(req, res) {
  Flight.find({}, (err, flights) => {
    res.render('flights/index', { title: "All Flights", flights });
  });
}

function _new(req, res) {
  res.render('flights/new', { title: "Add Flight" });
}

function create(req, res) {
  let newFlight = new Flight(req.body);

  newFlight.save(err => {
    if (err) res.render('error');
    res.redirect('/flights');
  });
}

module.exports = {
  index,
  new: _new,
  create,
}
