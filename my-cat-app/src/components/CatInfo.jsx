import React from 'react';
import PropTypes from 'prop-types';
import CatInfoItem from './CatInfoItem';
import { Link } from 'react-router-dom';

const CatInfo = (
  { 
    name = '',
    origin = '',
    description = '',
    temperament = '',
    wikipediaUrl = '',
    breedId = ''
  }) => {
  return (
    <div className="mt-4 mb-4 mx-4">
      <ul className="">
        {breedId ? (
          <CatInfoItem title="Breed">
            <Link to={`/breeds/:${breedId}`} className="text-blue-600 underline hover:text-blue-800"> {name}</Link>
          </CatInfoItem>
        ) : (
          <CatInfoItem title="Breed"> {name}</CatInfoItem>
        )}
        <CatInfoItem title="Origin"> {origin}</CatInfoItem>
        <CatInfoItem title="Description"> {description}</CatInfoItem>
        <CatInfoItem title="Temperament"> {temperament}</CatInfoItem>
        <CatInfoItem title="Wikipedia link"> <a href={wikipediaUrl} className="text-blue-600 underline   hover:text-blue-800" target="_blank" >{wikipediaUrl}</a></CatInfoItem>
      </ul>
    </div>
  );
};

CatInfo.propTypes = {
  name: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  temperament: PropTypes.string.isRequired,
  wikipediaUrl: PropTypes.string.isRequired,
  breedId: PropTypes.string,
};

export default CatInfo;
