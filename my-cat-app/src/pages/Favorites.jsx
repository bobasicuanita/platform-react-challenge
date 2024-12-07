import React from 'react';
import { useQuery } from 'react-query';
import { fetchFavorites } from '../api';
import CatImageRemove from '../components/CatImageRemove';
import { useErrorContext } from '../context/ErrorContext';
import PageLoadingSpinner from '../components/PageLoadingSpinner';

const Favorites = () => {
  const { showError } = useErrorContext();
  const { data: favorites, isLoading } = useQuery('favorites', fetchFavorites, {
    onError: (error) => {
      showError(error.message);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Favorite Fluffy Criminals</h1>
      {isLoading && <PageLoadingSpinner />}
      {favorites?.length === 0 && <p>No Favorite Criminals Yet!</p>}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites?.map((favorite) => (
            <CatImageRemove
              key={favorite.id}
              favorite={favorite}
            />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
