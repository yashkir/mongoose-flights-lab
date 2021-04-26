var mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
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
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
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
