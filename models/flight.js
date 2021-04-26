var mongoose = require('mongoose');
var config = require('./config');

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: config.airports,
    required: true
  },
  arrival: Date,
});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true,
  },
  airport: {
    type: String,
    enum: config.airports,
    default: 'DEN',
    required: true
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true,
  },
  departs: {
    type: Date,
    default: function () {
      let date = new Date();
      date.setFullYear(date.getFullYear() + 1);

      return date;
    },
    required: true,
  },
  destinations: [destinationSchema],
});

flightSchema.methods.isLate = function () {
  if (this.departs < Date.now()) {
    return true;
  }
};

module.exports = mongoose.model('Flight', flightSchema)
