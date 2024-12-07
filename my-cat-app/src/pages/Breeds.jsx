import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchBreeds } from '../api';
import BreedsList from '../components/BreedsList';
import BreedDetail from '../components/BreedDetail';
import { useErrorContext } from '../context/ErrorContext';
import PageLoadingSpinner from '../components/PageLoadingSpinner';

const Breeds = () => {
  const { breedId } = useParams();
  const [breedDetail, setBreedDetail] = useState({});
  const { showError } = useErrorContext();
  const { data: breeds, isLoading, refetch } = useQuery('breeds', fetchBreeds, {
    onSuccess: (breeds) => {
      if (breedId) {
        const breed = breeds?.find((item) => item.id === breedId.slice(1));
        setBreedDetail(breed);
      }
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  useEffect(() => {
    if (!breedId) {
      setBreedDetail({});
    } else {
      refetch();
    }
  }, [breedId]);

  return (
    <div>
      {isLoading && <PageLoadingSpinner />}
      {!isLoading && !breedId && (
        <>
          <h1 className="text-2xl font-bold mb-4">Breeds</h1>
          <BreedsList breeds={breeds} />
        </>
      )}
      {!isLoading &&
        breedDetail &&
        Object.keys(breedDetail).length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4 ml-4">{breedDetail?.name}</h1>
          <BreedDetail breedDetail={breedDetail} />
        </>
      )}
    </div>
  );
};

export default Breeds;
