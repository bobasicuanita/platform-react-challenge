import React from 'react';
import { IconLoader } from '@tabler/icons-react';

const PageLoadingSpinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <IconLoader
        size={48} 
        color="black"
        className="animate-spin text-blue-500"
      />
    </div>
  );
};

export default PageLoadingSpinner;
