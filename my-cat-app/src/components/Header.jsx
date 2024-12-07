import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { headerMenu } from '../constants';
import { IconMenu2, IconX } from '@tabler/icons-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative z-50 flex items-center bg-blue-600 p-4">
      <h1 className="text-white ml-4 lg:text-xl sm:text-lg font-bold">
        Interpol's Most Wanted Cats
      </h1>

      <div className="hidden md:flex ml-auto gap-3">
        {headerMenu?.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              isActive ? 'font-bold text-white' : 'text-white'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <button
        className="ml-auto md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-blue-600 p-4 shadow-md z-50 md:hidden">
          <div className="flex flex-col gap-4">
            {headerMenu?.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? 'font-bold text-white'
                    : 'text-white'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

