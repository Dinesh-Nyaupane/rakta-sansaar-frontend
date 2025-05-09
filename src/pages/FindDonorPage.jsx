import React, { useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode'; // ✅ correct import
import SweetAlert from 'sweetalert2';
import FindDonors from '../components/FindDonors';
import DonorCard from '../components/DonorCard';

const FindDonorPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [locationReady, setLocationReady] = useState(false);
  const [locationTimeoutReached, setLocationTimeoutReached] = useState(false);

  // Step 1: Fetch user location from backend
  useEffect(() => {
    const fetchUserLocation = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5500/api/userLocation', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user location');
        }

        const data = await response.json();
        if (data.latitude && data.longitude) {
          setUserLocation({
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
          });
          setLocationReady(true);
        } else {
          setLocationReady(false);
          setError('Location not available in the system.');
        }
      } catch (err) {
        console.error('Error fetching user location:', err);
        setError('Unable to retrieve user location.');
      }
    };

    // Timeout logic to handle location request timing out
    const locationTimeout = setTimeout(() => {
      setLocationTimeoutReached(true);
      setError('Location request timed out. Please try again.');
    }, 10000); // Timeout after 10 seconds

    // Run the fetchUserLocation function
    fetchUserLocation().finally(() => {
      // Clear the timeout if the location request is completed before timeout
      clearTimeout(locationTimeout);
    });

    // Cleanup on component unmount
    return () => clearTimeout(locationTimeout);
  }, []);

  // Fetch stored donors if available
  useEffect(() => {
    const storedDonors = JSON.parse(localStorage.getItem('searchResults'));
    if (storedDonors) {
      setDonors(storedDonors);
    }
  }, []);

  const handleSearch = async (formData) => {
    const { latitude, longitude } = userLocation;

    if (!latitude || !longitude) {
      setError('User location is required to perform the search.');
      return;
    }

    const searchData = {
      ...formData,
      latitude,
      longitude,
      maxDistance: Number(formData.maxDistance) || 10,
      count: Number(formData.k) || 10,
    };

    console.log('Sending data:', searchData);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5500/api/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error('Error fetching donor data');
      }

      const data = await response.json();
      console.log('Received data:', data);
      setDonors(data.donors || []);

      // Store donors in localStorage for persistence
      localStorage.setItem('searchResults', JSON.stringify(data.donors || []));
    } catch (error) {
      console.error(error);
      setError(error.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Handle alert on location fetch failure
  useEffect(() => {
    if (error) {
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
    }
  }, [error]);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-red-600 mb-6">Find Blood Donors</h1>

      {locationTimeoutReached ? (
        <p className="text-center text-red-600 mt-4">Location request timed out. Please try again.</p>
      ) : (
        <FindDonors onSearch={handleSearch} isLocationReady={locationReady} />
      )}

      {loading && <p className="text-center text-gray-600 mt-4">Loading donors...</p>}

      {error && !locationTimeoutReached && (
        <p className="text-center text-red-600 mt-4">{error}</p>
      )}

      {donors.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Donor List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {donors.map((donor) => (
              <DonorCard key={donor._id || donor.email} donor={donor} />
            ))}
          </div>
        </div>
      )}

      {donors.length === 0 && !loading && !error && (
        <p className="text-center text-gray-600 mt-4">No donors found. Please refine your search.</p>
      )}
    </div>
  );
};

export default FindDonorPage;
