const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const endpoints = {
  login: `${API_URL}/api/auth/login`,
  register: `${API_URL}/api/auth/register`,
  doctors: `${API_URL}/api/doctors`,
  appointments: `${API_URL}/api/appointments`,
  timeslots: `${API_URL}/api/timeslots`
};

export default API_URL; 