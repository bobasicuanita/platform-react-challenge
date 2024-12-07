import React from 'react';
import { NavLink } from 'react-router-dom';
import { headerMenu } from '../constants';

const Header = () => {
  return (
    <div className="flex bg-blue-600 p-4">
      <h1 className="text-white ml-4 text-xl font-bold">Interpol's Most Wanted Cats</h1>
      <div className="ml-auto">
        <div className="flex gap-3">
          {headerMenu?.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) => (isActive ? 'font-bold text-white' : 'text-white')}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;