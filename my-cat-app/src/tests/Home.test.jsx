import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorProvider } from '../context/ErrorContext';
import { FavoriteProvider } from '../context/FavoriteContext';
import { createServer } from './server';

const queryClient = new QueryClient();

const renderComponent = async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <FavoriteProvider>
          <ErrorProvider>
            <Home />
          </ErrorProvider>
        </FavoriteProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
  const catImages = await screen.findAllByRole('img');

  return { catImages };
};

describe('Home Page View', async () => {
  createServer();
  it('displays a list of 10 cats on initial fetch', async () => {
    const { catImages } = await renderComponent();

    expect(catImages).toHaveLength(10);
  });
  it('has a load more button', async () => {
    await renderComponent();

    const button = screen.getByRole('button', { name: /load more flufftastic criminals/i })

    expect(button).toBeInTheDocument();
  });
  it('loads more images on when clicking load more button', async () => {
    await renderComponent();

    const button = screen.getByRole('button', { name: /load more flufftastic criminals/i })

    userEvent.click(button);

    await waitFor(() => {
      const catImages = screen.getAllByRole('img');
      expect(catImages).toHaveLength(20);
    });
  });
  it('favorites an image', async () => {
    await renderComponent();

    const emptyHeartIcon = screen.getByTestId('heart-icon-1');
    expect(emptyHeartIcon).toBeInTheDocument();
  
    const heartButton = screen.getAllByRole('button')[0];
    userEvent.click(heartButton);

    const filledHeartIcon = await screen.findByTestId('heart-filled-icon-1');
    expect(filledHeartIcon).toBeInTheDocument();
  });
  it('opens a modal when clicking on a cat', async () => {
    await renderComponent();

    const image = screen.getAllByRole('img', { name: /Cat Image 1/i })[0];

    userEvent.click(image);

    const modalTitle = await screen.findByText(/Unknown breed/i);

    expect(modalTitle).toBeInTheDocument();
  });
});
