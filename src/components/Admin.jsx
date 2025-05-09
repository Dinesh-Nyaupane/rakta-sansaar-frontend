import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import { FaTachometerAlt, FaUsers, FaChartBar } from 'react-icons/fa';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaHeartbeat } from 'react-icons/fa';

import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bloodType: '',
    isVerified: false,
  });
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/users/');
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (selectedPage === 'stats') {
        try {
          const res = await axios.get('http://localhost:5500/api/users/stats');
          setStats(res.data);
        } catch (err) {
          console.error('Failed to fetch stats:', err);
        }
      }
    };
    fetchStats();
  }, [selectedPage]);

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditingUser(userToEdit);
    setUserData({
      name: userToEdit.name,
      email: userToEdit.email,
      bloodType: userToEdit.bloodType,
      isVerified: userToEdit.isVerified,
    });
  };

  const handleSave = async () => {
    if (!userData.name || !userData.email || !userData.bloodType) {
      Swal.fire('Error', 'Please fill out all fields.', 'error');
      return;
    }

    try {
      await axios.put(`http://localhost:5500/api/users/update/${editingUser._id}`, userData);
      const updatedUsers = users.map((user) =>
        user._id === editingUser._id ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setUserData({ name: '', email: '', bloodType: '', isVerified: false }); // Clear the form
      Swal.fire('Success', 'User updated successfully!', 'success'); // SweetAlert after update
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDeleteConfirmation = (user) => {
    setUserToDelete(user);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(user);
      }
    });
  };

  const handleDelete = async (user) => {
    try {
      await axios.delete(`http://localhost:5500/api/users/delete/${user._id}`);
      setUsers(users.filter((u) => u._id !== user._id));
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const getDistanceChartData = () => {
    return {
      labels: ['<5 km', '5–10 km', '10–20 km', '>20 km'],
      datasets: [
        {
          label: 'Users',
          data: [15, 25, 10, 5],
          backgroundColor: '#6366F1',
        },
      ],
    };
  };

  return (
    <div className="flex mt-[64px] h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-800 text-white p-5 min-h-full">
        <h2 className="text-2xl font-semibold text-center mb-8">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li
            onClick={() => setSelectedPage('dashboard')}
            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500 ${selectedPage === 'dashboard' ? 'bg-red-600' : ''}`}
          >
            <FaTachometerAlt className="text-xl" />
            <span className="text-lg">Dashboard</span>
          </li>
          <li
            onClick={() => setSelectedPage('stats')}
            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500 ${selectedPage === 'stats' ? 'bg-red-600' : ''}`}
          >
            <FaChartBar className="text-xl" />
            <span className="text-lg">Stats</span>
          </li>
          <li
            onClick={() => setSelectedPage('users')}
            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500 ${selectedPage === 'users' ? 'bg-red-600' : ''}`}
          >
            <FaUsers className="text-xl" />
            <span className="text-lg">Users</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-5/6 p-8 overflow-auto">
        {selectedPage === 'dashboard' && (
          <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-lg w-full">
              <div className="mb-6">
                <FaHeartbeat className="text-6xl text-red-600 mx-auto mb-4" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Rakta Sansaar Admin Dashboard</h2>
              <p className="text-gray-600 mb-6">Manage the blood donation process with ease. Use the side panel to navigate.</p>
              <p className="text-xl text-gray-700 font-bold italic">"Donate Blood Save Lives"</p>
            </div>
          </div>
        )}

        {selectedPage === 'stats' && stats && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white shadow-lg p-6 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Verified Donors</h3>
                <Doughnut
                  data={{
                    labels: ['Verified', 'Unverified'],
                    datasets: [
                      {
                        data: [stats.verifiedUsers, stats.totalUsers - stats.verifiedUsers],
                        backgroundColor: ['#10B981', '#EF4444'],
                        hoverOffset: 10,
                      },
                    ],
                  }}
                />
              </div>
              <div className="bg-white shadow-lg p-6 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Blood Group Distribution</h3>
                <Bar
                  data={{
                    labels: Object.keys(stats.bloodGroups),
                    datasets: [
                      {
                        label: 'Users',
                        data: Object.values(stats.bloodGroups),
                        backgroundColor: '#3B82F6',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
              <div className="bg-white shadow-lg p-6 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Distance Distribution [Dummy]</h3>
                <Bar
                  data={getDistanceChartData()}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {selectedPage === 'users' && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Manage Users</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-md">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Blood Type</th>
                    <th className="p-4 text-left">Verified</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.bloodType}</td>
                      <td className="p-4">{user.isVerified ? 'Yes' : 'No'}</td>
                      <td className="p-4">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                          onClick={() => handleEdit(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleDeleteConfirmation(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingUser && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
                  <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
                  <form>
                    <div className="mb-4">
                      <label className="block text-lg">Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-lg">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-lg">Blood Type</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={userData.bloodType}
                        onChange={(e) => setUserData({ ...userData, bloodType: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-lg">Verified</label>
                      <input
                        type="checkbox"
                        placeholder='Click'
                        className="w-5 h-5"
                        checked={userData.isVerified}
                        onChange={() => setUserData({ ...userData, isVerified: !userData.isVerified })}
                      /> 
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md"
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-6 py-2 rounded-md"
                        onClick={() => setEditingUser(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={() => setEditingUser(null)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
