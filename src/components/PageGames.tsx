import React from 'react';
import {useCustomFetch} from "../api/useCustomFetch/useCustomFetch";
import {GameLister} from "../types/types";


export const PageGames = () => {

    const [data, loading, error] = useCustomFetch<{
        results: GameLister[];
    }>('games', {page_size: 20});

    console.log(data)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return null;
    }

    let filteredGames = data.results

    return (
        <div>
            <div>
                <h2>Список игр</h2>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Рейтинг</th>
                    <th>Платформа</th>
                    <th>Язык</th>
                    <th>Количество игроков</th>
                </tr>
                </thead>
                <tbody>
                {filteredGames.map(game => (
                    <tr key={game.id}>
                        <td>{game.name}</td>
                        <td>{game.rating}</td>
                        <td>{
                            game.parent_platforms.map(p => (
                             <span key={p.platform.id}>{`${p.platform.name} `}</span>
                            ))
                        }</td>
                        <td>{
                          new Set(game.tags.map(l => (
                              l.language
                          )))
                        }
                        </td>
                        <td>
                            {game.tags.find(g => g.slug === 'multiplayer')?.games_count || 0}

                        </td>
                        <td>
                            {
                                <img src={game.background_image} alt="Cover Image"
                                     style={{textAlign: 'right', width: '100px'}}/>
                            }

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredGames.length === 0 && <p>Нет доступных игр.</p>}
        </div>
    );
};

