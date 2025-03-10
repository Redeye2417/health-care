const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient')
      .populate('doctor');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single appointment
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    // Get the current highest queue number for the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const lastAppointment = await Appointment.findOne({
      appointmentDate: {
        $gte: today,
        $lt: tomorrow
      }
    }).sort({ queueNumber: -1 });

    const queueNumber = lastAppointment ? lastAppointment.queueNumber + 1 : 1;

    const appointment = new Appointment({
      patient: req.body.patientId,
      doctor: req.body.doctorId,
      appointmentDate: req.body.appointmentDate,
      queueNumber: queueNumber
    });

    const newAppointment = await appointment.save();
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('patient')
      .populate('doctor');
    
    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update appointment status
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (req.body.status) appointment.status = req.body.status;
    
    const updatedAppointment = await appointment.save();
    const populatedAppointment = await Appointment.findById(updatedAppointment._id)
      .populate('patient')
      .populate('doctor');
    
    res.json(populatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.remove();
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 