import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CatImage from './CatImage';
import Modal from './Modal';
import CatInfo from './CatInfo';
import EmptyInfo from './EmptyInfo';
import LoadMore from './LoadMore';
import PageLoadingSpinner from './PageLoadingSpinner';
import { useFavoriteContext } from '../context/FavoriteContext';

const CatsList = (
  {
    catImages = [],
    setLimit = () => {},
    isFetching = false
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCatImage, setSelectedCatImage] = useState({});
  const { likedCats, setLikedCats } = useFavoriteContext();
    
  const onLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };
    
  const onImageClick = (id) => {
    setIsOpen(!isOpen);
    const clickedCatImage = catImages.find((image) => image.id === id);
    setSelectedCatImage(clickedCatImage);
  };
    
  const onCloseModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-0 mb-8 min-h-screen">
        {catImages?.map((image, index) => (
          <CatImage
            key={index}
            image={image}
            onImageClick={onImageClick}
            setLikedCats={setLikedCats}
            likedCats={likedCats}
          />
        ))}
      </div>
      {isFetching && <PageLoadingSpinner />}
      <div className="flex items-center justify-center mt-8">
        <LoadMore onLoadMore={onLoadMore} />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title={selectedCatImage?.breeds?.[0]?.name ?? 'Unknown breed'}
        parameter={selectedCatImage?.url}
        type="cats"
      >
        <CatImage
          image={selectedCatImage}
          setLikedCats={setLikedCats}
          likedCats={likedCats}
          isInModal={true}
        />
        {selectedCatImage?.breeds?.[0] ? (<CatInfo
          name={selectedCatImage.breeds[0].name}
          origin={selectedCatImage.breeds[0].origin}
          description={selectedCatImage.breeds[0].description}
          temperament={selectedCatImage.breeds[0].temperament}
          wikipediaUrl={selectedCatImage.breeds[0].wikipedia_url}
          breedId={selectedCatImage.breeds[0].id}
        />) : <EmptyInfo />}
      </Modal>
    </>
  );
};

CatsList.propTypes = {
  catImages: PropTypes.array.isRequired,
  setLimit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default CatsList;
