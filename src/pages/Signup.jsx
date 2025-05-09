import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

// Fix Leaflet marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Signup = () => {
  const navigate = useNavigate();  // Initialize navigate
  const defaultPosition = [27.6776, 83.4358]; // Nepathya College
  const markerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    phoneNo: '',
    password: '',
    bloodType: '',
    latitude: defaultPosition[0],
    longitude: defaultPosition[1],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMarkerDrag = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const { lat, lng } = marker.getLatLng();
      setFormData((prev) => ({
        ...prev,
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5500/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),

      });

      const data = await response.json();
      console.log(formData);
      console.log(data);
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: data.message || 'You have signed up successfully.',
        }).then(() => {
          navigate('/');  // Redirect to homepage after success
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: data.message || 'Something went wrong.',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Server is not responding. Please try again later.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">User Signup</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Date of Birth</label>
          <input
            type="date"
            name="dob"
            required
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Gender</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold">Phone</label>
          <input
            type="tel"
            name="phoneNo"
            required
            value={formData.phoneNo}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Blood Type</label>
          <select
            name="bloodType"
            required
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">--Select--</option>
            <option value="A+">A+</option>
            <option value="A−">A−</option>
            <option value="B+">B+</option>
            <option value="B−">B−</option>
            <option value="O+">O+</option>
            <option value="O−">O−</option>
            <option value="AB+">AB+</option>
            <option value="AB−">AB−</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            readOnly
            className="w-full p-2 mt-1 border bg-gray-100 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            readOnly
            className="w-full p-2 mt-1 border bg-gray-100 rounded"
          />
        </div>

        <div className="md:col-span-2 mt-6">
          <label className="block text-sm font-semibold mb-2">Select Location</label>
          <div className="h-[400px] w-full">
            <MapContainer
              center={defaultPosition}
              zoom={16}
              scrollWheelZoom={true}
              className="h-full w-full rounded"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                draggable={true}
                position={[formData.latitude, formData.longitude]}
                ref={markerRef}
                eventHandlers={{ dragend: handleMarkerDrag }}
              />
            </MapContainer>
          </div>
        </div>

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
