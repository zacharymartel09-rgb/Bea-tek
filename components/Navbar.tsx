
import React, { useState } from 'react';

interface NavbarProps {
  onNavLinkClick: (id: 'home' | 'services' | 'about' | 'contact') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (id: 'home' | 'services' | 'about' | 'contact') => {
    onNavLinkClick(id);
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="bg-black fixed w-full z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => handleScrollTo('home')}
          className="focus:outline-none cursor-pointer text-white"
          aria-label="BEATEK Events Home"
        >
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold text-bea-tek-magenta">BEATEK</span>
            <span className="text-base text-white -mt-1">Events</span>
          </div>
        </button>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none focus:text-bea-tek-magenta"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <button onClick={() => handleScrollTo('home')} className="text-white hover:text-bea-tek-magenta transition duration-300">Home</button>
          <button onClick={() => handleScrollTo('services')} className="text-white hover:text-bea-tek-magenta transition duration-300">Services</button>
          <button onClick={() => handleScrollTo('about')} className="text-white hover:text-bea-tek-magenta transition duration-300">About Us</button>
          <button onClick={() => handleScrollTo('contact')} className="text-white hover:text-bea-tek-magenta transition duration-300">Contact</button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-bea-tek-dark pb-4 px-4">
          <button onClick={() => handleScrollTo('home')} className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800 transition duration-300">Home</button>
          <button onClick={() => handleScrollTo('services')} className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800 transition duration-300">Services</button>
          <button onClick={() => handleScrollTo('about')} className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800 transition duration-300">About Us</button>
          <button onClick={() => handleScrollTo('contact')} className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800 transition duration-300">Contact</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
