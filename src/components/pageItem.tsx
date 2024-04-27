import React from 'react';
import {useCustomFetch} from "../api/useCustomFetch/useCustomFetch";


type Platform1 = {
   platform:{id:number,name:string};
}
type Genre = {
    id: number
    name: string
}
type ShortScreenshot = {
    id: number
    image: string
}
type Tag = {
    id: number,
    slug: string,
    language: string,
    games_count: number,   //?
}

type GameLister = {
    id: number,
    name: string,
    rating: number,
    background_image: string,
    parent_platforms: Platform1[]
    genres: Genre[]
    short_screenshots: ShortScreenshot[]
    tags: Tag[]
}

export const PageGames = () => {

    const [data, loading, error] = useCustomFetch<{
        results: GameLister[];
    }>('games', {page_size: 10});

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

    //фильтрацию по рейтингу , конкретная платформа , по играм которым есть только русский язык,фильтрация по количеству гроков(все игры которые меньше 500)


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

