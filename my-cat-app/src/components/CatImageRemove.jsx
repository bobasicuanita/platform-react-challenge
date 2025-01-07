import React from 'react';
import PropTypes from 'prop-types';
import { IconX, IconLoader } from '@tabler/icons-react';
import { useMutation, useQueryClient } from 'react-query';
import { removeFavorite } from '../api';
import { useErrorContext } from '../context/ErrorContext';

const CatImageRemove = ({ favorite = {} }) => {
  const queryClient = useQueryClient();
  const { showError } = useErrorContext();

  const removeFavoriteCat = useMutation((favoriteId) => removeFavorite(favoriteId), {
    onSuccess: () => {
      queryClient.invalidateQueries('favorites');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  const { isLoading } = removeFavoriteCat;

  const handleRemove = (favoriteId) => {
    removeFavoriteCat.mutate(favoriteId);
  };
    
  return (
    <div className="relative group">
      <img
        src={favorite.image.url}
        alt="Cat"
        className="w-full h-64 sm:h-96 object-cover"
      />
      <button onClick={() => handleRemove(favorite.id)} className="absolute top-5 right-4 p-2 bg-white opacity-50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isLoading && (
          <IconLoader
            size={24} 
            color="black"
            className="animate-spin text-blue-500"
          />
        )}
        {!isLoading && (
          <IconX
            size={24}
            color="black"
          />
        )}
      </button>
    </div>
  );
};

CatImageRemove.propTypes = {
    favorite: PropTypes.object.isRequired,
};

export default CatImageRemove;
