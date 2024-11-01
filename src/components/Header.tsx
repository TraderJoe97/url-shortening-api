import CompanyLogo from "../assets/logo.svg"
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={CompanyLogo} alt="Logo" className="h-8  mr-2" />
          </div>
          {/* Links and Buttons */}
          <div className="border-2 hidden md:flex grow items-center justify-between space-x-6">
            <div className="border-2 hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-800 hover:text-gray-600">Features</a>
              <a href="#pricing" className="text-gray-800 hover:text-gray-600">Pricing</a>
              <a href="#resources" className="text-gray-800 hover:text-gray-600">Resources</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#login" className="text-gray-800 hover:text-gray-600">Login</a>
              <a href="#signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Sign Up</a>
            </div>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="container px-5 md:hidden bg-Dark_Violet divide-y divide-gray-200 rounded">
            <div className="flex container flex-col items-center">
              <a href="#features" className="px-4 py-2 text-white ">Features</a>
              <a href="#pricing" className="px-4 py-2 text-white ">Pricing</a>
              <a href="#resources" className="px-4 py-2 text-white ">Resources</a>
            </div>
            <div className="flex container flex-col items-center">
              <button className="block px-4 py-2 text-white ">
                Login
              </button>
              <button className="btnPrimary rounded-full block px-4 py-2 text-white ">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;