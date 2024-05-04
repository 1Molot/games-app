import React, {useState} from 'react';
import {useCustomFetch} from '../api/useCustomFetch/useCustomFetch';
import './GamesList.css';
import {GameLister} from "../types/types";
import {Filters} from "./Filters";
import {GameItem} from "./GameItem";

export const GameList = () => {
    const [data, loading, error] = useCustomFetch<{ results: GameLister[] }>('games', {page_size: 20});

    const [filteredGames, setFilteredGames] = useState<GameLister[]>([]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return null;
    }

    return (
        <div className="page-games">
            <Filters results={data.results} setFilteredGames={setFilteredGames}/>
            <div className="games-list">
                {filteredGames.map((game) => (
                    <GameItem key={game.id} game={game} />
                ))}
                {filteredGames.length === 0 && <p>Нет доступных игр.</p>}
            </div>
        </div>
    );
};
