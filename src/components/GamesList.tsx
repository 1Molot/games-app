import React, {useEffect, useState} from 'react';
import {useCustomFetch} from '../api/useCustomFetch/useCustomFetch';
import './GamesList.css';
import {GameLister} from "../types/types";

export const GameList = () => {
    const [data, loading, error] = useCustomFetch<{ results: GameLister[] }>('games', {page_size: 20});
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
                    game.parent_platforms.some((platform) => platform.name === platformFilter)
                );
            }

            if (languageFilter) {
                filtered = filtered.filter((game) =>
                    game.tags.some((tag) => tag.language === languageFilter)
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


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return null;
    }

    const clearFilters = () => {
        setRatingFilter(null);
        setPlatformFilter(null);
        setLanguageFilter(null);
        setPlayersFilter(null);
        setFilteredGames(data.results);
    };


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


    return (
        <div className="page-games">
            <div className="filters">
                <h2>Список игр</h2>
                <div>
                    <label>
                        Рейтинг:
                        <input type="number" min={0} max={10} step={0.1} onChange={handleRatingChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        Платформа:
                        <select onChange={handlePlatformChange}>
                            <option value="">Все</option>
                            <option value="PC">PC</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PlayStation">PlayStation</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Язык:
                        <select onChange={handleLanguageChange}>
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
                        <input type="number" min={0} onChange={handlePlayersChange}/>
                    </label>
                </div>
                <div>
                    <button onClick={clearFilters}>Сбросить фильтры</button>
                </div>

            </div>
            <div className="games-list">
                {filteredGames.map((game) => (
                    <div key={game.id} className="game-card">
                        <img src={game.background_image} alt={game.name}/>
                        <h3>{game.name}</h3>
                        <p>Рейтинг: {game.rating}</p>
                        <p>Платформы: {game.parent_platforms.map((platform) => platform.name).join(', ')}</p>
                        <p>Жанры: {game.genres.map((genre) => genre.name).join(', ')}</p>
                        <p>Количество
                            игроков: {game.tags.find((tag) => tag.slug === 'multiplayer')?.games_count || 0}</p>
                    </div>
                ))}
                {filteredGames.length === 0 && <p>Нет доступных игр.</p>}
            </div>
        </div>
    );
};

