import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUser();  // API call to fetch profile data
      setUserData(data);
    };
    fetchUserProfile();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserProfile userData={userData} />
    </div>
  );
};

export default ProfilePage;
