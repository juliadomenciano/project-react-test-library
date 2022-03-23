import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

const pokemons = [
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
const emptyPokemons = [];

describe('Testando o componente About.', () => {
  it('Verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ emptyPokemons } />);

    const notFound = screen.getByText('No favorite pokemon found');

    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se é exibido na tela', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const name = screen.getByText(/Pikachu/i);

    expect(name).toBeInTheDocument();
  });
});
