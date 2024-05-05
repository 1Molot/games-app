import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Filters } from './Filters';
import { GameLister } from '../types/types';

describe('Filters', () => {
  const results = [
    {
      id: 1,
      name: 'Game 1',
      rating: 8.5,
      background_image: '',
      parent_platforms: [{ platform: { id: 1, name: 'PC' } }],
      tags: [{ id: 1, language: 'Russian', slug: 'multiplayer', games_count: 10 }],
    },
    {
      id: 2,
      name: 'Game 2',
      rating: 7.5,
      background_image: '',
      parent_platforms: [{ platform: { id: 2, name: 'PlayStation' } }],
      tags: [{ id: 2, language: 'English', slug: 'multiplayer', games_count: 5 }],
    },
    {
      id: 3,
      name: 'Game 3',
      rating: 9.0,
      background_image: '',
      parent_platforms: [{ platform: { id: 3, name: 'Xbox' } }],
      tags: [{ id: 3, language: 'Spanish', slug: 'single-player', games_count: 2 }],
    },
  ] as GameLister[];

  test('filters games based on rating', () => {
    const setFilteredGames = jest.fn();
    const { getByLabelText } = render(<Filters results={results} setFilteredGames={setFilteredGames} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const ratingInput = getByLabelText('Рейтинг:') as HTMLInputElement;
    fireEvent.change(ratingInput, { target: { value: '8.0' } });

    expect(setFilteredGames).toHaveBeenCalledWith([results[0], results[2]]);
  });

  test('filters games based on platform', () => {
    const setFilteredGames = jest.fn();
    const { getByLabelText } = render(<Filters results={results} setFilteredGames={setFilteredGames} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const platformSelect = getByLabelText('Платформа:') as HTMLSelectElement;
    fireEvent.change(platformSelect, { target: { value: 'PC' } });

    expect(setFilteredGames).toHaveBeenCalledWith([results[0]]);
  });

  test('filters games based on language', () => {
    const setFilteredGames = jest.fn();
    const { getByLabelText } = render(<Filters results={results} setFilteredGames={setFilteredGames} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const languageSelect = getByLabelText('Язык:') as HTMLSelectElement;
    fireEvent.change(languageSelect, { target: { value: 'ru' } });

    expect(setFilteredGames).toHaveBeenCalledWith(results);
  });

  test('filters games based on players count', () => {
    const setFilteredGames = jest.fn();
    const { getByLabelText } = render(<Filters results={results} setFilteredGames={setFilteredGames} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const playersInput = getByLabelText('Количество игроков:') as HTMLInputElement;
    fireEvent.change(playersInput, { target: { value: 5 } });

    expect(setFilteredGames).toHaveBeenCalledWith(results);
  });

  test('clears all filters', () => {
    const setFilteredGames = jest.fn();
    const { getByText } = render(<Filters results={results} setFilteredGames={setFilteredGames} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const clearFiltersButton = getByText('Сбросить фильтры') as HTMLButtonElement;
    fireEvent.click(clearFiltersButton);

    expect(setFilteredGames).toHaveBeenCalledWith(results);
  });
});
