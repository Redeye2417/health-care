import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Doctor Queue System
        </Link>
        <div className="space-x-4">
          <Link to="/doctors" className="text-white hover:text-blue-200">
            Doctors
          </Link>
          <Link to="/book-appointment" className="text-white hover:text-blue-200">
            Book Appointment
          </Link>
          <Link to="/queue-status" className="text-white hover:text-blue-200">
            Queue Status
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 