import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About.', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
