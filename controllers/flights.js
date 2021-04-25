var Flight = require("../models/flight");

function index(req, res) {

  Flight.find({}, (err, flights) => {
    let now = new Date();

    res.render('flights/index', { title: "All Flights", flights });
  });
}

function _new(req, res) {
  let newFlight = new Flight();
  /* Here we strip the ending of the ISO date so that it behaves
   * nicely with the date pickers. Later we need to re-add the 
   * GMT designation 'Z', otherwise the time we input will be
   * interpreted in the local timezone of the SERVER (oops) */
  let defaultDeparts = newFlight.departs.toISOString().slice(0, 16); 

  res.render('flights/new', { title: "Add Flight", defaultDeparts});
}

function create(req, res) {
  /* Here we add the 'Z'ulu (UTC) timezone designation so that
   * the time is not treated as in our local time zone. */
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

module.exports = {
  index,
  new: _new,
  create,
}
