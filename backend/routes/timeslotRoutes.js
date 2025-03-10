const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// Get available time slots for a doctor on a specific date
router.get('/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const date = new Date(req.query.date);
    
    // Get doctor's available slots
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Get day of week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];

    // Get doctor's slots for this day
    const daySlots = doctor.availableSlots.find(slot => slot.day === dayOfWeek);
    if (!daySlots) {
      return res.json([]);
    }

    // Get existing appointments for this date
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    
    const existingAppointments = await Appointment.find({
      doctorId,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // Generate available time slots
    const bookedSlots = existingAppointments.map(apt => apt.timeSlot);
    const availableSlots = generateTimeSlots(daySlots, bookedSlots);

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to generate time slots
function generateTimeSlots(daySlot, bookedSlots) {
  const slots = [];
  const start = new Date(`2000-01-01 ${daySlot.startTime}`);
  const end = new Date(`2000-01-01 ${daySlot.endTime}`);
  const duration = daySlot.slotDuration;

  while (start < end) {
    const slotStart = start.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    start.setMinutes(start.getMinutes() + duration);
    
    const slotEnd = start.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });

    const slot = {
      startTime: slotStart,
      endTime: slotEnd
    };

    // Check if slot is already booked
    if (!bookedSlots.some(bookedSlot => 
      bookedSlot.startTime === slot.startTime && 
      bookedSlot.endTime === slot.endTime
    )) {
      slots.push(slot);
    }
  }

  return slots;
}

module.exports = router; 