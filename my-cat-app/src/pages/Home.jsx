import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { fetchCats } from '../api';
import CatsList from '../components/CatsList';
import { useErrorContext } from '../context/ErrorContext';

const Home = () => {
  const [catImages, setCatImages] = useState([]);
  const [limit, setLimit] = useState(10);
  const { showError } = useErrorContext();

  const memoizedCatImages = useMemo(() => catImages, [catImages]);

  const { isFetching } = useQuery(['randomCats', limit], () => fetchCats(limit), {
    onSuccess: (data) => {
      setCatImages(() => [...data]);
    },
    refetchOnWindowFocus: false,
    onError: (error) => {
      showError(error.message);
    },
  });

  return (
    <div className="font-roboto">
      <h1 className="text-2xl font-bold mb-4">Cat Invasion below..</h1>
      {catImages && (
        <CatsList catImages={memoizedCatImages} setLimit={setLimit} isFetching={isFetching} />
      )}
    </div>
  );
};

export default Home;
