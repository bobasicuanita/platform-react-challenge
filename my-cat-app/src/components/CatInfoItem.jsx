import React from 'react';
import PropTypes from 'prop-types';

const CatInfoItem = ({ title = '', children = '' }) => {
  return (
    <li className="my-1">
      <span className="font-semibold">{title}:</span>
       {children}
    </li>
  );
};

CatInfoItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default CatInfoItem
