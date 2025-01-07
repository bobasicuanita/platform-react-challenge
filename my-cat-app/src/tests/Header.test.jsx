import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';
import { headerMenu } from '../constants';

const renderWithRouter = (ui) => {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
};

describe('Header Component View', () => {
  it('renders the header title', () => {
    renderWithRouter();
    expect(screen.getByText("Interpol's Most Wanted Cats")).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter();
    headerMenu.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('shows the menu button on mobile', () => {
    renderWithRouter();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies active class to the link', () => {
    renderWithRouter();
    const activeLink = headerMenu[0];
    const linkElement = screen.getByText(activeLink.label);

    userEvent.click(linkElement);

    expect(linkElement).toHaveClass('font-bold text-white');
  });
});
