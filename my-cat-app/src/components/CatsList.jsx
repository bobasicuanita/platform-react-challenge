import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CatImageCard from './CatImageCard';
import Modal from './Modal';
import CatInfo from './CatInfo';
import EmptyInfo from './EmptyInfo';
import LoadMore from './LoadMore';
import PageLoadingSpinner from './PageLoadingSpinner';
import { useFavoriteContext } from '../context/FavoriteContext';

const CatsList = (
  {
    catsList = [],
    setLimit = () => {},
    isFetching = false
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayCat, setDisplayCat] = useState({});
  const { likedCats, setLikedCats } = useFavoriteContext();
    
  const onLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };
    
  const onImageClick = (id) => {
    setIsOpen(!isOpen);
    const clickedCatImage = catsList.find((cat) => cat.id === id);
    setDisplayCat(clickedCatImage);
  };
    
  const onCloseModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 mb-8 min-h-screen">
        {catsList?.map((cat, index) => (
          <CatImageCard
            key={index}
            cat={cat}
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
        title={displayCat?.breeds?.[0]?.name ?? 'Unknown breed'}
        parameter={displayCat?.url}
        type="cats"
      >
        <CatImageCard
          cat={displayCat}
          setLikedCats={setLikedCats}
          likedCats={likedCats}
          isInModal={true}
        />
        {displayCat?.breeds?.[0] ? (<CatInfo
          name={displayCat.breeds[0].name}
          origin={displayCat.breeds[0].origin}
          description={displayCat.breeds[0].description}
          temperament={displayCat.breeds[0].temperament}
          wikipediaUrl={displayCat.breeds[0].wikipedia_url}
          breedId={displayCat.breeds[0].id}
        />) : <EmptyInfo />}
      </Modal>
    </>
  );
};

CatsList.propTypes = {
  catsList: PropTypes.array.isRequired,
  setLimit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default CatsList;