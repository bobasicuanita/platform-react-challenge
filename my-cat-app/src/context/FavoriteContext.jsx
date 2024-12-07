import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [likedCats, setLikedCats] = useState([]);

  return (
    <FavoriteContext.Provider value={{ likedCats, setLikedCats }}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useFavoriteContext = () => useContext(FavoriteContext);

