import React, { useEffect, useState } from 'react';
import { useCustomFetch } from '../api/useCustomFetch/useCustomFetch';
import './GamesList.css';
import { GameLister } from "../types/types";

const tags: { [key: string]: string } = {
    eng: "English",
    ru: "Russian",
    spa: "Spanish"
};

const clearFilters = (setFilteredGames: Function, data: { results: GameLister[] }) => {
    setFilteredGames([...data.results]);
};

export const GameList = () => {
    const [data, loading, error] = useCustomFetch<{ results: GameLister[] }>('games', { page_size: 20 });
    const [filteredGames, setFilteredGames] = useState<GameLister[]>([]);
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [platformFilter, setPlatformFilter] = useState<string | null>(null);
    const [languageFilter, setLanguageFilter] = useState<string | null>(null);
    const [playersFilter, setPlayersFilter] = useState<number | null>(null);

    useEffect(() => {
        if (data) {
            let filtered = [...data.results];

            if (ratingFilter) {
                filtered = filtered.filter((game) => game.rating >= ratingFilter);
            }

            if (platformFilter) {
                filtered = filtered.filter((game) =>
                    game.parent_platforms.some((p) => p.platform.name === platformFilter)
                );
            }

            if (languageFilter) {
                filtered = filtered.filter((game) =>
                    game.tags.some((tag) => tags[tag.language] === languageFilter)
                );
            }

            if (playersFilter) {
                filtered = filtered.filter(
                    (game) =>
                        (game.tags.find((tag) => tag.slug === 'multiplayer')?.games_count || 0) < playersFilter
                );
            }

            setFilteredGames(filtered);
        }
    }, [data, ratingFilter, platformFilter, languageFilter, playersFilter]);

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('filters') || '{}');

        setRatingFilter(savedFilters.ratingFilter || null);
        setPlatformFilter(savedFilters.platformFilter || null);
        setLanguageFilter(savedFilters.languageFilter || null);
        setPlayersFilter(savedFilters.playersFilter || null);
    }, []);

    useEffect(() => {
        const filters = {
            ratingFilter,
            platformFilter,
            languageFilter,
            playersFilter
        };

        localStorage.setItem('filters', JSON.stringify(filters));
    }, [ratingFilter, platformFilter, languageFilter, playersFilter]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return null;
    }

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rating = parseFloat(event.target.value);
        setRatingFilter(rating);
    };

    const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const platform = event.target.value;
        setPlatformFilter(platform);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const language = event.target.value;
        setLanguageFilter(language);
    };

    const handlePlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const players = parseInt(event.target.value);
        setPlayersFilter(players);
    };

    const handleClearFilters = () => {
        clearFilters(setFilteredGames, data);
        localStorage.removeItem('filters');
        setRatingFilter(null);
        setPlatformFilter(null);
        setLanguageFilter(null);
        setPlayersFilter(null);
    };

    return (
        <div className="page-games">
            <div className="filters">
                <h2>Список игр</h2>
                <div>
                    <label>
                        Рейтинг:
                        <input type="number" min={0} max={10} step={0.1} onChange={handleRatingChange} value={ratingFilter || ''} />
                    </label>
                </div>
                <div>
                    <label>
                        Платформа:
                        <select onChange={handlePlatformChange} value={platformFilter || ''}>
                            <option value="">Все</option>
                            <option value="PC">PC</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Apple Macintosh">Apple Macintosh</option>
                            <option value="Android">Android</option>
                            <option value="Linux">Linux</option>
                            <option value="Nintendo">Nintendo</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Язык:
                        <select onChange={handleLanguageChange} value={languageFilter || ''}>
                            <option value="">Все</option>
                            <option value="Russian">Русский</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Количество игроков:
                        <input type="number" min={0} onChange={handlePlayersChange} value={playersFilter || ''} />
                    </label>
                </div>
                <div>
                    <button onClick={handleClearFilters}>
                        Сбросить фильтры
                    </button>
                </div>
            </div>
            <div className="games-list">
                {filteredGames.map((game) => (
                    <div key={game.id} className="game-card">
                        <img src={game.background_image} alt={game.name} />
                        <h3>{game.name}</h3>
                        <p>Рейтинг: {game.rating}</p>
                        <p>Платформы: {game.parent_platforms.map((p) => p.platform.name).join(', ')}</p>
                        <p>Жанры: {game.genres.map((genre) => genre.name).join(', ')}</p>
                        <p>Язык: {Array.from(new Set(game.tags.map((tag) => tags[tag.language] || '')))}</p>
                        <p>Количество игроков: {game.tags.find((tag) => tag.slug === 'multiplayer')?.games_count || 0}</p>
                    </div>
                ))}
                {filteredGames.length === 0 && <p>Нет доступных игр.</p>}
            </div>
        </div>
    );
};
