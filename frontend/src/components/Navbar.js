import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Doctor Queue System
          </Link>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="hover:text-blue-200">Login</Link>
                <Link to="/register" className="hover:text-blue-200">Register</Link>
              </>
            ) : (
              <>
                <Link 
                  to={user.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'} 
                  className="hover:text-blue-200"
                >
                  Dashboard
                </Link>
                {user.role === 'patient' && (
                  <Link to="/book-appointment" className="hover:text-blue-200">
                    Book Appointment
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="hover:text-blue-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
