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
          रक्त संसारमा सामेल हुनुहोस् र जीवन बचाउने रक्तदान आन्दोलनको हिस्सा बन्नुहोस्।
          दाताहरू खोज्नुहोस्, रगतको अनुरोध गर्नुहोस्, र खाँचोमा परेकाहरूलाई मद्दत गर्नुहोस्—हरेक थोपा महत्त्वपूर्ण छ।
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
