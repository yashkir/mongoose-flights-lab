var Ticket = require('../models/ticket');

function _new(req, res) {
  res.render('tickets/new', { title: "Add a ticket", flightId: req.params.id });
}

function create(req, res, next) {
  req.body.flight = req.params.id;
  let ticket = new Ticket(req.body);

  ticket.save()
    .then(() => {
      res.redirect(`/flights/${req.params.id}`);
    })
    .catch(err => {
      if (err) next(err);
    });
}

function _delete(req, res, next) {
  let flightId;

  Ticket.findById(req.params.id)
    .then(ticket => {
      flightId = ticket.flight;
      ticket.remove();
    })
    .then(() => {
      res.redirect(`/flights/${flightId}`);
    })
    .catch(err => {
      if (err) next(err);
    });
}

module.exports = {
  new: _new,
  create,
  delete: _delete,
}
