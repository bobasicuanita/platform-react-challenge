import React from 'react';
import { render, screen } from '@testing-library/react';
import BreedDetail from '../components/BreedDetail';

const renderComponent = () => {
  const breedDetail = {
    name: 'Bengal',
    origin: 'Asia',
    description: 'A great cat.',
    temperament: 'Intelligent',
    wikipedia_url: 'https://en.wikipedia.org/wiki/bengal',
  }

  return render(
    <BreedDetail breedDetail={breedDetail} />
  );
};

describe('Breeding Details Component View', () => {
  it('displays a list with the breed details', () => {
    renderComponent();
    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });
  it('displays 5 breed list items', () => {
    renderComponent();

    const listItems = screen.getAllByRole('listitem');

    const expectedItems = [
      'Breed: Bengal',
      'Origin: Asia',
      'Description: A great cat.',
      'Temperament: Intelligent',
    ];

    expect(listItems).toHaveLength(5);

    expectedItems.forEach((expectedText, index) => {
      expect(listItems[index]).toHaveTextContent(expectedText);
    });
    const linkItem = listItems[4];
    expect(linkItem).toHaveTextContent('Wikipedia link:');
  
    const link = linkItem.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/bengal');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
