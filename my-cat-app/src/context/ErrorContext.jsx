import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const showError = useCallback((message) => {
    setErrorMessage(message);
    setIsErrorOpen(true);
    setTimeout(() => setIsErrorOpen(false), 5000);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, errorMessage, isErrorOpen }}>
      {children}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useErrorContext = () => useContext(ErrorContext);
