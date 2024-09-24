const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    flightID: String,
    scheduleTime: String
});

module.exports = mongoose.model('reservation', BookingSchema);