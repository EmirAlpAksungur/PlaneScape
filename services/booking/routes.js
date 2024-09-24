const express = require('express');
const Booking = require('./model');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const newArray = new Booking(req.body);
        await newArray.save();
        res.status(201).json(newArray);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/get', async (req, res) => {
    try {
        const arrays = await Booking.find();
        res.json(arrays);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;