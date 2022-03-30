import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const details = 'More details';

describe('Testando o componente About.', () => {
  it('Verifica se detalhes do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: details });
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();

    const pokemonName = screen.getByRole('heading',
      { name: 'Pikachu Details', level: 2 });
    expect(pokemonName).toBeInTheDocument();

    const head = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(pokemonName).toBeInTheDocument();
    expect(head).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se existe uma seção com os mapas e as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: details });
    userEvent.click(detailsLink);

    const locations = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(locations).toBeInTheDocument();

    const img = screen.getAllByAltText(/Pikachu location/i);

    expect(img[0]).toBeInTheDocument();
    expect(img[1]).toBeInTheDocument();
    expect(img[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Verifica se o usuário pode favoritar um pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: details });
    userEvent.click(detailsLink);

    const checkFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    expect(checkFavorite).toBeInTheDocument();
    userEvent.type(checkFavorite);
    expect(checkFavorite).toBeChecked();

    userEvent.type(checkFavorite);
    expect(checkFavorite).not.toBeChecked();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const notFound = screen.getByText('No favorite pokemon found');

    expect(notFound).toBeInTheDocument();

    history.push('/pokemons/25');
    userEvent.type(checkFavorite);
    userEvent.click(favoriteLink);
    expect(notFound).not.toBeInTheDocument();
  });
});
