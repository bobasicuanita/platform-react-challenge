import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { IconPaw } from '@tabler/icons-react';

const LoadMore = ({ onLoadMore = () => {} }) => {
  return (
    <Button
      onClick={onLoadMore}
      additionalClasses="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Load More flufftastic criminals
      <IconPaw size={24} className="ml-2" color="white" />
    </Button>
  );
};

LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMore;
