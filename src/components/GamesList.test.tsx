import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { GameList } from './GamesList';

jest.mock('../api/useCustomFetch/useCustomFetch', () => ({
    useCustomFetch: () => ({
        loading: false,
        error: null,
        data: {
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
        fetchGames: jest.fn(),
    }),
}));

describe('GameList', () => {
    test('renders games', async () => {
        render(<GameList />);

        const gameElement = await screen.findByText('Game 1');

        expect(gameElement).toBeInTheDocument();
        expect(screen.getByText('Рейтинг: 8.5')).toBeInTheDocument();
        expect(screen.getByText('Платформы: PC')).toBeInTheDocument();
        expect(screen.getByText('Жанры: Action')).toBeInTheDocument();
        expect(screen.getByText('Язык: English')).toBeInTheDocument();
        expect(screen.getByText('Количество игроков: 10')).toBeInTheDocument();
    });

});
