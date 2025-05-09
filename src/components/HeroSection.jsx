import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ⬅️ Added useLocation

const HeroSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to fetch user data from localStorage
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('raktaUser'));
      if (storedUser) {
        setUser(storedUser);
      } else {
        setUser(null); // Set to null if no user data is found
      }
    };

    // Fetch user data initially
    fetchUser();

    // Listen for logout or changes in localStorage to update state
    const handleLogout = () => {
      // When logout occurs, manually update the user state
      setUser(null);
    };

    // Listen to storage changes, if 'raktaUser' is removed in another tab, update the state
    window.addEventListener('storage', fetchUser);

    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', fetchUser);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-gray-700 text-lg mb-6">
            {user ? `Welcome Back, ${user.name}!` : 'Welcome back, User!'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4 leading-tight">
          Donate Blood, Save Lives
          </h1>
          <p className="text-gray-700 text-lg mb-6">
          Join Rakta Sansaar and be part of the life-saving blood donation movement.
Find donors, request blood, and help those in need—every drop counts.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-300">
          <Link to="/findDonors" className="hover:underline">Get Started</Link>

          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={"https://i.ibb.co/9HXwTHDW/illustration.png"}
            alt="Blood Donation Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
