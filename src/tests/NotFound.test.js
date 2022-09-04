import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About.', () => {
  it('Verifica se página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      /*       <span role="img" aria-label="Crying emoji"> </span> */
      const title = screen.getByRole('heading',
        { name: /Page requested not found/i, level: 2 });

      const span = screen.getByText('😭');

      expect(title).toBeInTheDocument();
      expect(span).toBeInTheDocument();
    });

  it('Verifica se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
