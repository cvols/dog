import { render, screen } from '@testing-library/react';
import { Card, Preview } from './Components';

test('renders Card component', () => {
  const src = 'https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg';
  const breed = 'Affenpinscher';

  render(<Card src={src} breed={breed} />);

  const nameElement = screen.getByText(breed);
  const shareElement = screen.getByText('Share');
  const learnMoreElement = screen.getByText('Learn More');

  expect(nameElement).toBeInTheDocument();
  expect(shareElement).toBeInTheDocument();
  expect(learnMoreElement).toBeInTheDocument();
});
