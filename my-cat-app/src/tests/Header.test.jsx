import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import { headerMenu } from '../constants';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Header Component Ciew', () => {
  it('renders the header title', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("Interpol's Most Wanted Cats")).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    headerMenu.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('shows the menu button on mobile', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies active class to the link', () => {
    renderWithRouter(<Header />);
    const activeLink = headerMenu[0];
    const linkElement = screen.getByText(activeLink.label);

    fireEvent.click(linkElement);

    expect(linkElement).toHaveClass('font-bold text-white');
  });
});
