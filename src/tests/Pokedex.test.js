import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokedex from '../components/Pokedex';
import pokemon from '../data';
import renderWithRouter from './renderWithRouter';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const TestId = 'next-pokemon';

describe('Testando o componente About.', () => {
  it('Verifica se é exibido na tela a mensagem Encountered pokémons', async () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const head = await screen.findByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });

    expect(head).toBeInTheDocument();
  });

  it('Verifica se exibide o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const button = screen.getByTestId(TestId);
    const buttonName = screen.getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
    expect(buttonName).toBeInTheDocument();

    userEvent.click(button);
    const name = screen.getByText(/Charmander/i);
    expect(name).toBeInTheDocument();

    userEvent.click(button);
    const nextName = screen.getByText(/Caterpie/i);
    expect(nextName).toBeInTheDocument();
  });

  it('Verifica se exibide o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const button = screen.getByTestId(TestId);
    expect(button).toBeInTheDocument();

    pokemon.forEach(() => {
      userEvent.click(button);
    });

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Verifica se exibide um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const button = screen.getByTestId(TestId);

    const findPokemon = screen.getAllByTestId('pokemon-name');
    userEvent.click(button);

    expect(findPokemon).toHaveLength(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const num = 7;

    const filters = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByText('All');

    expect(filters).toHaveLength(num);
    expect(filters[0]).toHaveTextContent('Electric');
    expect(filters[1]).toHaveTextContent('Fire');
    expect(filters[2]).toHaveTextContent('Bug');
    expect(filters[3]).toHaveTextContent('Poison');
    expect(filters[4]).toHaveTextContent('Psychic');
    expect(filters[5]).toHaveTextContent('Normal');
    expect(filters[6]).toHaveTextContent('Dragon');
    expect(allButton).toBeInTheDocument();
  });

  it('Verifica se o filtro funciona', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const psychicButton = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(psychicButton[4]);
    const firstPsychic = screen.getByText(/Alakazam/i);
    expect(firstPsychic).toBeInTheDocument();

    const button = screen.getByTestId(TestId);
    userEvent.click(button);
    const secondPsychic = screen.getByText(/Mew/i);
    expect(secondPsychic).toBeInTheDocument();
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const allButton = screen.getAllByTestId('');
    const all = screen.getByText('All');

    userEvent.click(all);

    const firstNameAfterloading = screen.getByText(/Pikachu/i);
    expect(firstNameAfterloading).toBeInTheDocument();

    const button = screen.getByText('Próximo pokémon');

    userEvent.click(button);
    const secondtNameAfterloading = screen.getByText(/Charmander/i);
    expect(secondtNameAfterloading).toBeInTheDocument();

    expect(allButton).toHaveLength(1);
  });
});
