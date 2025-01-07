import React from 'react';
import PropTypes from 'prop-types';
import { IconX, IconCat } from '@tabler/icons-react';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import Button from './Button';
import PageLoadingSpinner from './PageLoadingSpinner';

const Modal = (
  {
    isOpen = false,
    onClose = () => {},
    children = '',
    title = '',
    parameter = '',
    type = '',
    isLoading = false,
}) => {
  if (!isOpen) return null;
  const { isCopied, error, copyToClipboard } = useCopyToClipboard();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl">
        {isLoading ? <PageLoadingSpinner /> : (
          <>
            <div className="flex justify-between w-full mb-4 border-b py-6 px-4 border-gray-300">
              <div>
                <h1>{title}</h1>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <IconX size={24} color="black" />
              </button>
            </div>
            {children}
            {type === 'cats' && (
              <div className="flex w-full border-t py-6 px-4">
                <Button
                  onClick={() => copyToClipboard(parameter)}
                  additionalClasses="ml-auto"
                >
                  <IconCat
                    size={24}
                    color="white"
                    className="mr-2"
                  />
                  {isCopied && !error && 'Link copied!'}
                  {!isCopied && !error && 'Copy Cat\'s Image'}
                  {!isCopied && error && 'Failed to Copy'}
                </Button>
                <Button onClick={onClose} additionalClasses="ml-2" outline>
                  Cancel
                </Button>
              </div>
            )}
            {type === 'breeds' && (
              <div className="flex w-full border-t py-6 px-4">
                <Button onClick={onClose} additionalClasses="ml-auto" outline>
                   Cancel
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  parameter: PropTypes.string,
  type: PropTypes.string,
};

export default Modal;