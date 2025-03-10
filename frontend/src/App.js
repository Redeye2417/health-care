import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DoctorList from './pages/DoctorList';
import AppointmentForm from './pages/AppointmentForm';
import QueueStatus from './pages/QueueStatus';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/book-appointment" element={<AppointmentForm />} />
          <Route path="/queue-status" element={<QueueStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 