import React from "react";
import PropTypes from 'prop-types';

const Button = (
  {
    children = '',
    onClick = () => {},
    outline = false,
    additionalClasses = '',
  }) => {
  return (
    <button
      onClick={onClick}
      className={`${outline ? 'bg-white text-blue-600 font-bold py-2 px-6 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : 'bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'} flex ${additionalClasses}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  outline: PropTypes.bool,
  additionalClasses: PropTypes.string,
};

export default Button;
