import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SignupPage from '../pages/Signup';
import LoginPage from '../pages/Login';
import FindDonorPage from '../pages/FindDonorPage';
import ProtectedRoute from '../components/ProtectedRoute';
import Admin from '../components/Admin'; // Import AdminPage here
import DonorInfo from '../components/DonorInfo'; // Import the DonorInfo page

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<Admin />} /> {/* Admin Route */}
      <Route path="/profile" element={<ProfilePage />} /> {/* Admin Route */}

      {/* Route for Individual Donor Info */}
      <Route path="/donor/:donorId" element={<DonorInfo />} /> {/* Dynamic route for donor info */}

      {/* 🔐 Protected Route */}
      <Route
        path="/findDonors"
        element={
          <ProtectedRoute>
            <FindDonorPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
