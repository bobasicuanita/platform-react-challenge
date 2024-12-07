import React from 'react';
import PropTypes from 'prop-types';
import CatInfo from '../components/CatInfo';

const BreedDetail = ({ breedDetail = [] }) => {
  return (
    <div>
      <CatInfo
        name={breedDetail.name}
        origin={breedDetail.origin}
        description={breedDetail.description}
        temperament={breedDetail.temperament}
        wikipediaUrl={breedDetail.wikipedia_url}
      />
    </div>
  );
};

BreedDetail.propTypes = {
  breeds: PropTypes.array,
};

export default BreedDetail;
