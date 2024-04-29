import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {GameList} from "./GamesList";

jest.mock('../api/useCustomFetch/useCustomFetch', () => ({
    useCustomFetch: () => [
        {
            results: [
                {
                    id: 1,
                    name: 'Game 1',
                    rating: 8.5,
                    parent_platforms: [{ platform: { name: 'PC' } }],
                    genres: [{ name: 'Action' }],
                    tags: [{ language: 'eng', slug: 'multiplayer', games_count: 4 }],
                    background_image: 'game1.jpg'
                },
                {
                    id: 2,
                    name: 'Game 2',
                    rating: 7.2,
                    parent_platforms: [{ platform: { name: 'Xbox' } }],
                    genres: [{ name: 'RPG' }],
                    tags: [{ language: 'ru', slug: 'multiplayer', games_count: 2 }],
                    background_image: 'game2.jpg'
                }
            ]
        },
        false,
        null
    ]
}));

describe('GameList component', () => {
    test('renders loading state', () => {
        render(<GameList />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state', () => {
        // Mocked custom fetch hook with error
        jest.mock('../api/useCustomFetch/useCustomFetch', () => ({
            useCustomFetch: () => [null, false, new Error('Fetch error')]
        }));

        render(<GameList />);
        expect(screen.getByText('Error: Fetch error')).toBeInTheDocument();
    });

    test('renders game list', () => {
        render(<GameList />);
        expect(screen.getByText('Список игр')).toBeInTheDocument();
        expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
        expect(screen.getByText('Платформа:')).toBeInTheDocument();
        expect(screen.getByText('Язык:')).toBeInTheDocument();
        expect(screen.getByText('Количество игроков:')).toBeInTheDocument();
        expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.getByText('Game 2')).toBeInTheDocument();
    });

    test('filters games by rating', () => {
        render(<GameList />);
        fireEvent.change(screen.getByLabelText('Рейтинг:'), { target: { value: '8' } });
        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.queryByText('Game 2')).toBeNull();
    });

    test('filters games by platform', () => {
        render(<GameList />);
        fireEvent.change(screen.getByLabelText('Платформа:'), { target: { value: 'PC' } });
        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.queryByText('Game 2')).toBeNull();
    });

    test('filters games by language', () => {
        render(<GameList />);
        fireEvent.change(screen.getByLabelText('Язык:'), { target: { value: 'English' } });
        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.queryByText('Game 2')).toBeNull();
    });

    test('filters games by players count', () => {
        render(<GameList />);
        fireEvent.change(screen.getByLabelText('Количество игроков:'), { target: { value: '3' } });
        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.queryByText('Game 2')).toBeNull();
    });

    test('clears filters', () => {
        render(<GameList />);
        fireEvent.change(screen.getByLabelText('Рейтинг:'), { target: { value: '8' } });
        fireEvent.change(screen.getByLabelText('Платформа:'), { target: { value: 'PC' } });
        fireEvent.change(screen.getByLabelText('Язык:'), { target: { value: 'English' } });
        fireEvent.change(screen.getByLabelText('Количество игроков:'), { target: { value: '3' } });
        fireEvent.click(screen.getByText('Сбросить фильтры'));
        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.getByText('Game 2')).toBeInTheDocument();
    });
});
