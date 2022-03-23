import { screen } from '@testing-library/react';
import React from 'react';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';

const pokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries.',
  },
];

describe('Testando o componente About.', () => {
  it('Verifica se é exibido na tela a mensagem Encountered pokémons', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(pokemon),
    });
    renderWithRouter(<PokemonDetails />);

    const head = await screen.findByRole('heading',
      { name: /Summary/i, level: 2 });
    /* const paragraph = await screen.getByText(pokemon.summary); */

    expect(head).toBeInTheDocument();
    /*     expect(paragraph).toBeInTheDocument(); */
  });
});
