var Flight = require("../models/flight");

function index(req, res) {
  res.render('flights/index', { title: "All Flights", flights: Flight.find({}) });
}

module.exports = {
  index,
}
