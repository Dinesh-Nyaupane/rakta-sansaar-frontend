import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // ⬅️ Added useLocation
import { FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ Used to re-run effect on route change
  const dropdownRef = useRef(null);

  // ✅ Check if the user is logged in whenever route changes
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('userName');

    if (token) {
      setIsLoggedIn(true);
      setUserName(name || 'User');
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // ⬅️ Update on location change

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Show SweetAlert before logging out
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove token, user data, and username from localStorage
        localStorage.removeItem('authToken');   // Remove auth token
        localStorage.removeItem('raktaUser');   // Remove raktaUser data
        localStorage.removeItem('userName');  
        localStorage.removeItem('longitude');
        localStorage.removeItem('latitude')  // Remove username

        // Update local state
        setIsLoggedIn(false);  // Update login state to false
        setUserName('');       // Clear the username state

        Swal.fire({
          title: 'Logged out successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/');  // Redirect to home after logout
      }
    });
  };

  return (
    <nav className="bg-gray-100 text-red shadow-md" id='navbar'>
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          🩸 Rakta Sansaar
        </Link>

        {/* Center - Navigation Links */}
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/findDonors" className="hover:underline text-l">Find Donors</Link>
          <Link to="/donation" className="hover:underline text-l">Donation</Link>
          <Link to="/request" className="hover:underline text-l">About Us</Link>
        </div>

        {/* Right - User Profile Icon / Auth Links */}
        <div className="flex items-center space-x-4">
          {/* User Icon - Always show dropdown */}
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              className="text-2xl cursor-pointer hover:text-red-600"
              onClick={toggleDropdown}
            />
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                <Link to="/my-requests" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Requests</Link>
                <Link to="/donation-history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Donations</Link>

                {/* Login/Logout Button */}
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
