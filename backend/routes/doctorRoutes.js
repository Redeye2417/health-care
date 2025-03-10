const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single doctor
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new doctor
router.post('/', async (req, res) => {
  const doctor = new Doctor({
    name: req.body.name,
    specialization: req.body.specialization,
    email: req.body.email,
    available: req.body.available
  });

  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update doctor
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (req.body.name) doctor.name = req.body.name;
    if (req.body.specialization) doctor.specialization = req.body.specialization;
    if (req.body.email) doctor.email = req.body.email;
    if (req.body.available !== undefined) doctor.available = req.body.available;

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete doctor
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await doctor.remove();
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 