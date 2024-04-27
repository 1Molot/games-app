import React from 'react';
//import React, { useState, useEffect } from 'react';

//
// // Компонент списка игр
// const GameList = () => {
//     const [games.ts, setGames] = useState([]); // Список игр
//     const [platformFilter, setPlatformFilter] = useState(''); // Фильтр платформы
//     const [ratingSort, setRatingSort] = useState(''); // Сортировка по рейтингу
//
//     // Получение данных об играх (заглушка)
//     useEffect(() => {
//         // Здесь должен быть код получения данных об играх (API запрос или импорт из файла)
//         // После получения данных обновите состояние списка игр: setGames(data)
//         const data = [
//             {
//                 id: 1,
//                 title: 'Игра 1',
//                 rating: 4.5,
//                 platform: 'PC',
//                 language: ['English', 'Russian'],
//                 multiplayer: {
//                     offline: 2,
//                     online: true
//                 },
//                 coverImage: 'cover1.jpg',
//                 screenshots: ['screenshot1.jpg', 'screenshot2.jpg']
//             },
//             // Добавьте остальные игры
//         ];
//         setGames(data);
//     }, []);
//
//     // Фильтрация игр по платформе
//     const filterGamesByPlatform = (platform) => {
//         setPlatformFilter(platform);
//     };
//
//     // Сортировка игр по рейтингу
//     const sortGamesByRating = (sortOrder) => {
//         setRatingSort(sortOrder);
//     };
//
//     // Применение фильтрации и сортировки к списку игр
//     let filteredGames = [...games.ts];
//     if (platformFilter) {
//         filteredGames = filteredGames.filter(game => game.platform === platformFilter);
//     }
//     if (ratingSort === 'asc') {
//         filteredGames.sort((a, b) => a.rating - b.rating);
//     } else if (ratingSort === 'desc') {
//         filteredGames.sort((a, b) => b.rating - a.rating);
//     }
//
//     return (
//         <div>
//             <div>
//                 <h2>Список игр</h2>
//                 <div>
//                     <label>Фильтр по платформе:</label>
//                     <select onChange={(e) => filterGamesByPlatform(e.target.value)}>
//                         <option value="">Все платформы</option>
//                         <option value="PC">PC</option>
//                         <option value="PlayStation">PlayStation</option>
//                         <option value="Xbox">Xbox</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>Сортировка по рейтингу:</label>
//                     <select onChange={(e) => sortGamesByRating(e.target.value)}>
//                         <option value="">Без сортировки</option>
//                         <option value="asc">По возрастанию</option>
//                         <option value="desc">По убыванию</option>
//                     </select>
//                 </div>
//             </div>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Название</th>
//                     <th>Рейтинг</th>
//                     <th>Платформа</th>
//                     <th>Язык</th>
//                     <th>Многопользовательский</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {filteredGames.map(game => (
//                     <tr key={game.id}>
//                         <td>{game.title}</td>
//                         <td>{game.rating}</td>
//                         <td>{game.platform}</td>
//                         <td>{game.language.includes('Russian') ? 'Да' : 'Нет'}</td>
//                         <td>
//                             {game.multiplayer.offline > 0 && <span>Оффлайн: {game.multiplayer.offline} игрока(ов)</span>}
//                             {game.multiplayer.online && <span>Онлайн</span>}
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default GameList;
