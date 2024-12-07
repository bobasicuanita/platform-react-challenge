import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { addFavorite } from '../api';
import { IconHeart, IconHeartFilled, IconLoader } from '@tabler/icons-react';
import { useErrorContext } from '../context/ErrorContext';

const CatImage = (
  {
    image = {},
    onImageClick = () => {},
    setLikedCats = () => {},
    likedCats = [],
    isInModal = false,
  }) => {
  const queryClient = useQueryClient();
  const { showError } = useErrorContext();

  const addFavoriteCat = useMutation((imageId) => addFavorite(imageId), {
    onSuccess: () => {
      queryClient.invalidateQueries('favorites');
      setLikedCats([...likedCats, image.id]);
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  const { isLoading } = addFavoriteCat;

  const onFavorite = () => {
    if (likedCats.includes(image.id)) return;
    addFavoriteCat.mutate(image.id);
  };
    
  return (
    <div className={`relative group ${isInModal ? 'px-4' : 'cursor-pointer'}`}>
      <img
        src={image.url}
        alt={image.name}
        className="w-full h-64 sm:h-96 object-cover"
        onClick={() => onImageClick(image.id)}
      />
      <button
        onClick={onFavorite}
        className={`absolute top-5 ${isInModal ? 'right-8' : 'right-4'} p-2 bg-white opacity-50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
          {!likedCats.includes(image.id) && !isLoading && (
            <IconHeart
              size={24} 
              color="black"
            />
          )}
          {likedCats.includes(image.id) && !isLoading && (
            <IconHeartFilled
              size={24} 
              color="black"
            />
          )}
          {isLoading && (
            <IconLoader
              size={24} 
              color="black"
              className="animate-spin text-blue-500"
            />
          )}
      </button>
    </div>
  );
};

CatImage.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func,
  setLikedCats: PropTypes.func.isRequired,
  likedCats: PropTypes.array.isRequired,
  isInModal: PropTypes.bool,
};

export default CatImage;
