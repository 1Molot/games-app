import React, {useEffect, useState} from 'react';
import {Game} from "../types/types";
import {GAMES} from "../constans/games";


type Platform = '' | 'PC' | 'PlayStation' | 'Xbox';
type RatingSortOrder = '' | 'asc' | 'desc';

export const PageGames = () => {

    const [games, setGames] = useState<Game[]>([]); // Список игр
    const [platformFilter, setPlatformFilter] = useState<Platform>(''); // Фильтр платформы
    const [ratingSort, setRatingSort] = useState<RatingSortOrder>(''); // Сортировка по рейтингу


   useEffect(() => {
         setGames(GAMES);
     }, []);

    // Фильтрация игр по платформе
     const filterGamesByPlatform = (platform:Platform) => {
         setPlatformFilter(platform);
    };

    // Сортировка игр по рейтингу
    const sortGamesByRating = (sortOrder:RatingSortOrder) => {
        setRatingSort(sortOrder);
     };

    // Применение фильтрации и сортировки к списку игр
    let filteredGames = [...games];
   if (platformFilter) {
        filteredGames = filteredGames.filter(game => game.platform === platformFilter);
    }
     if (ratingSort === 'asc') {
        filteredGames.sort((a, b) => a.rating - b.rating);
   } else if (ratingSort === 'desc') {
        filteredGames.sort((a, b) => b.rating - a.rating);
    }

    return (
        <div>
            <div>
                <h2>Список игр</h2>
                <div>
                    <label>Фильтр по платформе:</label>
                    <select onChange={(e) => filterGamesByPlatform(e.target.value as Platform)}>
                        <option value="">Все платформы</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation">PlayStation</option>
                         <option value="Xbox">Xbox</option>
                    </select>
                </div>
                <div>
                    <label>Сортировка по рейтингу:</label>
                   <select onChange={(e) => sortGamesByRating(e.target.value as RatingSortOrder)}>
                       <option value="">Без сортировки</option>
                       <option value="asc">По возрастанию</option>
                         <option value="desc">По убыванию</option>
                   </select>
                 </div>
             </div>
            <table>
                 <thead>
                <tr>
                    <th>Название</th>
                    <th>Рейтинг</th>
                    <th>Платформа</th>
                   <th>Язык</th>
                    <th>Многопользовательский</th>
                </tr>
                 </thead>
                 <tbody>
                {filteredGames.map(Game => (
                   <tr key={Game.id}>
                        <td>{Game.title}</td>
                         <td>{Game.rating}</td>
                         <td>{Game.platform}</td>
                        <td>{Game.language.includes('Russian') ? 'Да' : 'Нет'}</td>
                        <td>
                             {Game.multiplayer?.offline > 0 && <span>Оффлайн: {Game.multiplayer.offline} игрока(ов)</span>}
                           {Game.multiplayer.online && <span>Онлайн</span>}
                        </td>
                       <td >
                           {
                               Game.coverImage.map((image:string,index) => (
                                   <img key={index} src={image} alt="Cover Image" style={{ textAlign: 'right',width:'100px' }}/>
                               ))
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


