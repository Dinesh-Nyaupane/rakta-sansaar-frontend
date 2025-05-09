import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaGooglePlusG, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto py-8 px-4 text-center">

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition">
            <FaInstagram />
          </a>
          <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition">
            <FaTwitter />
          </a>
          <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition">
            <FaGooglePlusG />
          </a>
          <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition">
            <FaYoutube />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-6 text-sm font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/news" className="hover:underline">News</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/team" className="hover:underline">Our Team</Link>
        </div>

        {/* Bottom Line */}
        <div className="text-xs text-gray-400 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()}, Designed by <span className="text-white ">Dinesh Nyaupane</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
