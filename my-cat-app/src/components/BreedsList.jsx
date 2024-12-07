import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { fetchImagesByBreed } from '../api';
import Modal from './Modal';
import CatImageCard from './CatImageCard';
import CatInfo from '../components/CatInfo';
import { useErrorContext } from '../context/ErrorContext';
import { useFavoriteContext } from '../context/FavoriteContext';
import PageLoadingSpinner from './PageLoadingSpinner';

const BreedsList = ({ breeds = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayBreed, setDisplayBreed] = useState(null);
  const [catList, setCatList] = useState([]);
  const { likedCats, setLikedCats } = useFavoriteContext();

  const { showError } = useErrorContext();

  const { isLoading } = useQuery(
    ['breedImages', displayBreed],
    () => fetchImagesByBreed(displayBreed),
    { 
      enabled: !!displayBreed,
      onSuccess: (breed) => {
        setCatList(breed);
      },
      onError: (error) => {
        showError(error.message);
      },
      refetchOnWindowFocus: false,
    },
  );
    
  const onOpenModal = (id) => {
    setIsOpen(!isOpen);
    setDisplayBreed(id);
  };

  const onCloseModal = () => {
    setIsOpen(!isOpen);
    setDisplayBreed(null);
    setCatList(null);
  };

  return (
    <>
      <ul className="grid grid-flow-row auto-rows-max grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
        {breeds.map((breed) => (
          <li onClick={() => onOpenModal(breed.id)} key={breed.id} className="flex items-center gap-4 p-6 rounded-xl shadow-md w-full mb-4 cursor-pointer" >
            {breed.name}
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title="Breed Info"
        type="breeds"
      >
        {isLoading && <PageLoadingSpinner />}
        {catList?.map((cat) => (
          <React.Fragment key={cat.id}>
            <CatImageCard
                cat={cat}
                likedCats={likedCats}
                setLikedCats={setLikedCats}
                isInModal={true}
            />
            <CatInfo
              name={cat.breeds[0].name}
              origin={cat.breeds[0].origin}
              description={cat.breeds[0].description}
              temperament={cat.breeds[0].temperament}
              wikipediaUrl={cat.breeds[0].wikipedia_url}
              breedId={cat.breeds[0].id}
            />
          </React.Fragment>
        ))}
      </Modal>
    </>
  );
};

BreedsList.propTypes = {
  breeds: PropTypes.array,
};

export default BreedsList;
