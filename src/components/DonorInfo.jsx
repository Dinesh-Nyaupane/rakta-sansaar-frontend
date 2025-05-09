import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Mail, Phone, Droplet, Calendar, User, ShieldCheck, MapPin, AlertTriangle,
} from 'lucide-react';

const DonorInfo = () => {
  const { donorId } = useParams();
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/users/${donorId}`);
        const data = await response.json();
        setDonor(data);
      } catch (error) {
        console.error('Error fetching donor details:', error);
      }
    };
    fetchDonorDetails();
  }, [donorId]);

  if (!donor) return <div className="text-center mt-20 text-gray-500">Loading donor details...</div>;

  const {
    name,
    email,
    phoneNo,
    bloodType,
    dob,
    gender,
    lastDonationDate,
    profilePhoto,
    isVerified,
    healthConditions,
    location,
  } = donor;

  const age = moment().diff(moment(dob), 'years');

  return (
    <div className="min-h-screen mt-20 px-4 py-8 bg-white">
      <div className="max-w-5xl mx-auto shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8 bg-white">
        {/* Profile Picture */}
        <div className="w-full md:w-1/3 flex justify-center items-start">
          <img
            src={profilePhoto || 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'}
            alt={name}
            className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover border-4 border-gray-200 shadow"
          />
        </div>

        {/* Donor Details */}
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-3xl font-bold text-red-600">{name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10 text-gray-800">
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-500" /> {email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-500" /> {phoneNo}
            </p>
            <p className="flex items-center gap-2">
              <User className="w-5 h-5 text-red-500" /> {age} years old ({gender || 'N/A'})
            </p>
            <p className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-red-500" /> Blood Type: {bloodType}
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-red-500" /> {isVerified ? 'Verified ✅' : 'Not Verified ❌'}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" /> 
              Last Donation: {lastDonationDate ? moment(lastDonationDate).format('MMM D, YYYY') : 'Not Donated Yet'}
            </p>
            <p className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="w-5 h-5 text-red-500" /> 
              Location: {location?.coordinates ? `${location.coordinates[1]}, ${location.coordinates[0]}` : 'N/A'}
            </p>
            <p className="flex items-center gap-2 sm:col-span-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Health Conditions: {healthConditions?.length > 0 ? healthConditions.join(', ') : 'None'}
            </p>
          </div>

          {/* Request Donation Button */}
          <div className="pt-6">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300">
              🩸 Request Donation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorInfo;
