import React from 'react';
import { render, screen } from '@testing-library/react';
import Breeds from '../pages/Breeds';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorProvider } from '../context/ErrorContext';
import { FavoriteProvider } from '../context/FavoriteContext';
import { createServer } from './server';

const queryClient = new QueryClient();

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <FavoriteProvider>
          <ErrorProvider>
            <Breeds />
          </ErrorProvider>
        </FavoriteProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Breeds Page View', async () => {
  createServer();
  it('displays a list of breeds', async () => {
    renderComponent();

    expect(await screen.findByText('Abyssinian')).toBeInTheDocument();
    expect(await screen.findByText('Burmese')).toBeInTheDocument();
  });
});
