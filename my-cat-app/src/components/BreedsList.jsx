import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { fetchImagesByBreed } from '../api';
import Modal from './Modal';
import CatImage from './CatImage';
import CatInfo from '../components/CatInfo';
import { useErrorContext } from '../context/ErrorContext';
import { useFavoriteContext } from '../context/FavoriteContext';

const BreedsList = ({ breeds = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [catImages, setCatImages] = useState([]);
  const { likedCats, setLikedCats } = useFavoriteContext();

  const { showError } = useErrorContext();

  const { isLoading } = useQuery(
    ['breedImages', selectedBreed],
    () => fetchImagesByBreed(selectedBreed),
    { 
      enabled: !!selectedBreed,
      onSuccess: (breed) => {
        setCatImages(breed);
      },
      onError: (error) => {
        showError(error.message);
      },
      refetchOnWindowFocus: false,
    },
  );
    
  const handleOpenModal = (id) => {
    setIsOpen(!isOpen);
    setSelectedBreed(id);
  };

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
    setSelectedBreed(null);
    setCatImages(null);
  };

  const renderCatCards = () =>
  catImages.map((image) => (
    <React.Fragment key={image.id}>
      <CatImage
        image={image}
        likedCats={likedCats}
        setLikedCats={setLikedCats}
        isInModal
      />
      {image.breeds[0] && (
        <CatInfo
          name={image.breeds[0].name}
          origin={image.breeds[0].origin}
          description={image.breeds[0].description}
          temperament={image.breeds[0].temperament}
          wikipediaUrl={image.breeds[0].wikipedia_url}
          breedId={image.breeds[0].id}
        />
      )}
    </React.Fragment>
  ));

  return (
    <>
      <ul className="grid grid-flow-row auto-rows-max grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
        {breeds.map((breed) => (
          <li key={breed.name} onClick={() => handleOpenModal(breed.id)} className="flex items-center bg-blue-300 gap-4 p-6 rounded-xl shadow-md w-full mb-4 cursor-pointer" >
            {breed.name}
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Breed Info"
        type="breeds"
        isLoading={isLoading}
      >
        {catImages?.length > 0 ? renderCatCards() : <></>}
      </Modal>
    </>
  );
};

BreedsList.propTypes = {
  breeds: PropTypes.array,
};

export default BreedsList;

