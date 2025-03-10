import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Doctor Queue System</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">For Patients</h2>
          <p className="text-gray-600 mb-4">
            Book appointments with your preferred doctors and manage your queue position easily.
          </p>
          <Link
            to="/book-appointment"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Appointment
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">For Doctors</h2>
          <p className="text-gray-600 mb-4">
            Manage your appointments and patient queue efficiently.
          </p>
          <Link
            to="/login"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Doctor Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
