var Flight = require("../models/flight");
var modelConfig = require('../models/config');

function index(req, res) {
  Flight.find({}, (err, flights) => {
    res.render('flights/index', { title: "All Flights", flights });
  });
}

function show(req, res) {
  Flight.findOne({_id: req.params.id}, (err, flight) => {
    res.render('flights/show', {
      title: "Flight Details",
      flight,
      defaultDeparts: defaultDeparts(),
      airports: modelConfig.airports,
    });
  });
}

function _new(req, res) {
  res.render('flights/new', { title: "Add Flight", defaultDeparts: defaultDeparts()});
}

function create(req, res) {
  /* Here we add the 'Z'ulu (UTC) timezone designation so that
   * the time is not treated as in our local time zone. */
  console.log(req.body.departs);
  if (req.body.departs[req.body.departs.length - 1] !== 'Z') {
    req.body.departs = req.body.departs + 'Z';
  }

  let newFlight = new Flight(req.body);

  newFlight.save(err => {
    if (err) {
      console.log(err);
      res.render('flights/new', {
        title: "Add Flight",
        message: `Failed: ${err._message}`
      });
    } else {
      res.redirect('/flights');
    }
  });
}

function patch(req, res, next) {
  Flight.findOne({_id: req.params.id}, (err, flight) => {
    if (req.body.airport) {
      flight.destinations.push(req.body);
    }
    
    flight.save(err => { 
      if (err) {
        next(err);
      } else {
        res.redirect(`/flights/${flight.id}`);
      }
    });
  });

}

function _delete(req, res) {
  Flight.deleteOne({_id: req.params.id})
    .then(res.redirect('/flights'))
    .catch(err => res.render('error', {error: err}));
}

function defaultDeparts() {
  /* Here we strip the ending of the ISO date so that it behaves
   * nicely with the date pickers. Later we need to re-add the 
   * GMT designation 'Z', otherwise the time we input will be
   * interpreted in the local timezone of the SERVER (oops) */
  let newFlight = new Flight();
  let defaultDeparts = newFlight.departs.toISOString().slice(0, 16); 

  return defaultDeparts;
}

module.exports = {
  index,
  new: _new,
  create,
  show,
  patch,
  delete: _delete,
}
