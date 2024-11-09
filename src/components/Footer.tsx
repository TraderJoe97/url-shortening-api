import React from 'react';
import iconFacebook from '@/assets/icon-facebook.svg'
import iconTwitter from '@/assets/icon-twitter.svg'
import iconInstagram from '@/assets/icon-instagram.svg'
import iconPinterest from '@/assets/icon-pinterest.svg'

const Footer:React.FC = () => {
  return (
    <footer className="bg-Very_Dark_Violet px-5 text-white py-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        
        {/* Brand Name */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-2xl font-bold">Shortly</h2>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-around w-full lg:w-1/2">
          <div className="mb-6 lg:mb-0">
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">Link Shortening</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Branded Links</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Analytics</a></li>
            </ul>
          </div>

          <div className="mb-6 lg:mb-0">
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Developers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-6 lg:mt-0">
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white text-2xl"><img src={iconFacebook} alt="Facebook icon" /></a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white text-2xl"><img src={iconTwitter} alt="Facebook icon" /></a>
          <a href="#" aria-label="Pinterest" className="text-gray-400 hover:text-white text-2xl"><img src={iconPinterest} alt="Facebook icon" /></a>
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white text-2xl"><img src={iconInstagram} alt="Facebook icon" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
