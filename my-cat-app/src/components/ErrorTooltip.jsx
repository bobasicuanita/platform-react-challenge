import React from 'react';
import PropTypes from 'prop-types';
import { IconExclamationCircle } from '@tabler/icons-react';

const ErrorTooltip = ({ message = '', isOpen = false }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-xs px-4 py-3 bg-red-600 text-white rounded-md shadow-lg flex items-center justify-between"
      role="alert"
    >
      <div className="flex items-center space-x-2">
        <IconExclamationCircle size={24} color="white" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

ErrorTooltip.propTypes = {
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ErrorTooltip;

