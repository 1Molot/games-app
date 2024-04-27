import {useCustomState} from "../utils/useCustomState/useCustomState";
import {FetchOptions, useCustomFetch} from "../api/useCustomFetch/useCustomFetch";
import {useEffect} from "react";
import React from 'react';

type GameType = {
    id: any
    name:any
    rating:any
    cover:any
    screenshots:any
    platforms :any
}

export const GameList: React.FC = () => {
    const [games, setGames] = useCustomState<GameType[]>([]);
    const [sorting, setSorting] = useCustomState<string>('rating');
    const [platformFilter, setPlatformFilter] = useCustomState<string>('');

    // const options: FetchOptions = {
    //     method: 'POST',
    //     headers: {
    //          'Accept': 'application/json',
    //          'Client-ID': 'Client ID',
    //         'Authorization': 'Bearer access_token',
    //         'Accept': 'application/json',
    //         'Client-ID': 'abcdefg12345',
    //         'Authorization': 'Bearer access12345token',
    //     },
    //     body: `fields name, rating, cover.url, screenshots.url, platforms.name; sort ${sorting}; where platforms.name = "${platformFilter}";`,
    // };

    // const [data, loading, error] = useCustomFetch<GameType[]>('https://api.igdb.com/v4/games', options);

    // useEffect(() => {
    //     if (data) {
    //         setGames(data);
    //     }
    // }, [data, setGames]);

    const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSorting(event.target.value);
    };

    const handlePlatformFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlatformFilter(event.target.value);
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <div>
            <h1>Список игр</h1>

            <div>
                <label>Сортировать по рейтингу:</label>
                <select value={sorting} onChange={handleSortingChange}>
                    <option value="rating">По умолчанию</option>
                    <option value="rating desc">По убыванию</option>
                    <option value="rating asc">По возрастанию</option>
                </select>
            </div>

            <div>
                <label>Фильтр по платформе:</label>
                <input type="text" value={platformFilter} onChange={handlePlatformFilterChange}/>
            </div>

            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <h3>{game.name}</h3>
                        <p>Рейтинг: {game.rating}</p>
                        {game.cover && <img src={game.cover.url} alt={game.name}/>}
                        {game.screenshots && game.screenshots.map((screenshot:any) => (
                            <img key={screenshot.id} src={screenshot.url} alt="Screenshot"/>
                        ))}
                        {game.platforms && (
                            <p>Платформы: {game.platforms.map((platform:any) => platform.name).join(', ')}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
