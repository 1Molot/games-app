import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { GameList } from './GamesList';
import { useCustomFetch } from '../api/useCustomFetch/useCustomFetch';

jest.mock('../api/useCustomFetch/useCustomFetch');

describe('GameList', () => {
  beforeEach(() => {
    (useCustomFetch as jest.Mock).mockReturnValue([
      {
        results: [
          {
            id: 1,
            name: 'Game 1',
            rating: 8.5,
            parent_platforms: [{ platform: { name: 'PC' } }],
            genres: [{ name: 'Action' }],
            tags: [{ language: 'eng', slug: 'multiplayer', games_count: 10 }],
          },
        ],
      },
      false,
      null,
    ]);
  });
  test('renders games', () => {
    render(<GameList />);

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг: 8.5')).toBeInTheDocument();
    expect(screen.getByText('Платформы: PC')).toBeInTheDocument();
    expect(screen.getByText('Жанры: Action')).toBeInTheDocument();
    expect(screen.getByText('Язык: English')).toBeInTheDocument();
    expect(screen.getByText('Количество игроков: 10')).toBeInTheDocument();
  });
});
