var Flight = require("../models/flight");

function index(req, res) {
  res.render('flights/index', { title: "All Flights", flights: Flight.find({}) });
}

function _new(req, res) {
  res.render('flights/new', { title: "Add Flight" });
}

module.exports = {
  index,
  new: _new,
}
