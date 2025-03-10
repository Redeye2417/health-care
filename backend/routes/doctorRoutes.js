const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single doctor
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create doctor profile
router.post('/', async (req, res) => {
  const doctor = new Doctor({
    userId: req.body.userId,
    specialization: req.body.specialization,
    qualification: req.body.qualification,
    experience: req.body.experience,
    availableSlots: req.body.availableSlots
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

    if (req.body.specialization) doctor.specialization = req.body.specialization;
    if (req.body.qualification) doctor.qualification = req.body.qualification;
    if (req.body.experience) doctor.experience = req.body.experience;
    if (req.body.availableSlots) doctor.availableSlots = req.body.availableSlots;
    if (req.body.isAvailable !== undefined) doctor.isAvailable = req.body.isAvailable;

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 