import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5500'; // ✅ Define your base URL

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [locationData, setLocationData] = useState({
    latitude: '',
    longitude: '',
    address: '',
  });

  // Fetch user location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let address = '';

        // Optionally reverse geocode
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          address = res.data.display_name || '';
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
        }

        // Store location in state and localStorage
        setLocationData({ latitude, longitude, address });
        localStorage.setItem('longitude', longitude);
        localStorage.setItem('latitude', latitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Fallback in case of error
        setLocationData({ latitude: '', longitude: '', address: '' });
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      });

      if (response.data && response.data.user) {
        const { user, token, location } = response.data;

        // Store user data in localStorage
        localStorage.setItem('raktaUser', JSON.stringify(user));
        localStorage.setItem('userName', user.name);

        if (location && location.longitude && location.latitude) {
          localStorage.setItem('longitude', location.longitude);
          localStorage.setItem('latitude', location.latitude);
        }

        localStorage.setItem('authToken', token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Admin link at the top-right corner */}
      <div className="absolute top-4 right-4">
        <Link to="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
          Admin
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        <Link
          to="/signup"
          className="block text-center mt-4 text-sm text-gray-600 hover:text-indigo-500"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
