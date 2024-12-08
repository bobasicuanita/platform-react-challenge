import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { addFavorite } from '../api';
import { IconHeart, IconHeartFilled, IconLoader } from '@tabler/icons-react';
import { useErrorContext } from '../context/ErrorContext';

const CatImageCard = (
  {
    cat = {},
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
      setLikedCats([...likedCats, cat.id]);
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  const { isLoading } = addFavoriteCat;

  const onFavorite = () => {
    if (likedCats.includes(cat.id)) return;
    addFavoriteCat.mutate(cat.id);
  };
    
  return (
    <div className={`relative group ${isInModal ? 'px-4' : 'cursor-pointer'}`}>
      <img
        src={cat.url}
        alt="Cat"
        className="w-full h-64 sm:h-96 object-cover"
        onClick={() => onImageClick(cat.id)}
      />
      <button
        onClick={onFavorite}
        className={`absolute top-5 ${isInModal ? 'right-8' : 'right-4'} p-2 bg-white opacity-50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
          {!likedCats.includes(cat.id) && !isLoading && (
            <IconHeart
              size={24} 
              color="black"
            />
          )}
          {likedCats.includes(cat.id) && !isLoading && (
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

CatImageCard.propTypes = {
  cat: PropTypes.object.isRequired,
  onImageClick: PropTypes.func,
  setLikedCats: PropTypes.func.isRequired,
  likedCats: PropTypes.array.isRequired,
  isInModal: PropTypes.bool,
};

export default CatImageCard;