import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const NearbyDonorsMap = ({ donors = [] }) => {
  const [center, setCenter] = useState([27.7000, 85.3000]); // Default: Kathmandu coordinates
  const [zoom, setZoom] = useState(12); // Default zoom level

  // Handling marker icon customization for donors
  const createIcon = () => {
    return new L.Icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Map_pin_icon.svg/1200px-Map_pin_icon.svg.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold text-red-600 mb-6">Nearby Donors</h2>
        <p className="text-lg text-gray-700 mb-12">
          Find blood donors near you. The map below shows all available donors in your area.
        </p>

        {/* Leaflet Map */}
        <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Donor Markers */}
          {donors.map((donor, index) => (
            <Marker
              key={index}
              position={donor.location.coordinates}
              icon={createIcon()}
            >
              <Popup>
                <div>
                  <img
                    src={donor.profilePhoto || 'https://via.placeholder.com/100'}
                    alt={donor.name}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <h3 className="font-semibold">{donor.name}</h3>
                  <p className="text-sm">Blood Type: {donor.bloodType}</p>
                  <p className="text-sm">Location: {donor.location.city}</p>
                  <p className="text-sm">Last Donation: {new Date(donor.lastDonationDate).toLocaleDateString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default NearbyDonorsMap;
