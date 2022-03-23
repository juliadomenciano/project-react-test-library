import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
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
};
const pokemonId = true;

describe('Testando o componente About.', () => {
  it('Verifica se renderiza um card com as informações de determinado pokémon.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ pokemonId }
      />,
    );

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const averageWeight = 'Average weight: 6.0 kg';

    const img = screen.getByAltText('Pikachu sprite');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(pokemon.image);

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(averageWeight);
  });

  it('Verifica se renderiza um card com as informações de determinado pokémon.', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ pokemonId }
      />,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ pokemonId }
      />,
    );

    const star = screen.getAllByRole('img',
      { src: '/star-icon.svg', alt: 'Pikachu is marked as favorite' });

    expect(star[1]).toBeInTheDocument();
  });
});
