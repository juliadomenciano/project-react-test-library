import { screen } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About.', () => {
  it('Verifica se é exibido na tela a mensagem Encountered pokémons', async () => {
    /*  global.fetch = async () => ({ json: async () => ({
      ...pokemonType,
    }) }); */
    renderWithRouter(<Pokedex />);

    /* const head = await screen.findByRole('heading',
      { name: /Encountered pokémons/i, level: 2 }); */
    const head = screen.getByText('Encountered pokémons');

    expect(head).toBeInTheDocument();
  });
});
