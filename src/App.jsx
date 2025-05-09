// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRouter from './router'; // Ensure AppRouter is imported correctly
import Navbar from './components/NavBar';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'; // Import your CSS file

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();  // Get the current route location

  useEffect(() => {
    setLoading(true);  // Start loading when the route changes
    const timer = setTimeout(() => {
      setLoading(false);  // Stop loading after the delay
    }, 500);  // Set the delay time to 1.5 seconds (can be adjusted)

    return () => clearTimeout(timer); // Cleanup the timer
  }, [location]);  // Runs when the location (route) changes

  return (
    <>
      <Navbar />
      {/* Only show the loading spinner for the main content area */}
      <div className="min-h-screen">
        {loading ? (
          <LoadingSpinner /> // Show spinner during loading
        ) : (
          <AppRouter /> // Show the router when not loading
        )}
      </div>
    </>
  );
};

export default App;
