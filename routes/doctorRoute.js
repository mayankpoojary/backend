const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');
const verifyAuthToken = require('../middleware/authMiddleware');

// Create a new doctor
router.post('/', verifyAuthToken, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all doctors
router.get('/', verifyAuthToken, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.send(doctors);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a single doctor by ID
router.get('/:id', verifyAuthToken, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send();
    }
    res.send(doctor);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a doctor by ID
router.put('/:id', verifyAuthToken, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).send();
    }
    res.send(doctor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a doctor by ID
router.delete('/:id', verifyAuthToken, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).send();
    }
    res.send(doctor);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

