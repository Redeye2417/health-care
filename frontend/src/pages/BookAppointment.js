import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      setError('Error fetching doctors');
    }
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/timeslots/${doctorId}?date=${date}`
      );
      setAvailableSlots(response.data);
    } catch (error) {
      setError('Error fetching available slots');
    }
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    if (selectedDate) {
      fetchAvailableSlots(e.target.value, selectedDate);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (selectedDoctor) {
      fetchAvailableSlots(selectedDoctor, e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments', {
        doctorId: selectedDoctor,
        patientId: user.id,
        appointmentDate: selectedDate,
        timeSlot: selectedSlot
      });
      navigate('/patient/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Error booking appointment');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Select Doctor</label>
          <select
            value={selectedDoctor}
            onChange={handleDoctorChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Choose a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor._id} value={doctor._id}>
                Dr. {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {availableSlots.length > 0 && (
          <div>
            <label className="block mb-2">Select Time Slot</label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Choose a time slot</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={JSON.stringify(slot)}>
                  {slot.startTime} - {slot.endTime}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={!selectedDoctor || !selectedDate || !selectedSlot}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment; 