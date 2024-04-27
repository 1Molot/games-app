import React from 'react';
// // Компонент отдельной игры
// const GameItem = ({ game }) => {
//     const [showDetails, setShowDetails] = useState(false); // Флаг показа дополнительных деталей игры
//
//     return (
//         <div>
//             <div onClick={() => setShowDetails(!showDetails)}>
//                 <h3>{game.title}</h3>
//                 <img src={game.coverImage} alt={game.title} />
//             </div>
//             {showDetails && (
//                 <div>
//                     <p>Рейтинг: {game.rating}</p>
//                     <p>Платформа: {game.platform}</p>
//                     <p>Язык: {game.language.join(', ')}</p>
//                     <p>Многопользовательский режим:</p>
//                     {game.multiplayer.offline > 0 && <p>Оффлайн: {game.multiplayer.offline} игрока(ов)</p>}
//                     {game.multiplayer.online && <p>Онлайн</p>}
//                     <div>
//                         {game.screenshots.map((screenshot, index) => (
//                             <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// // Компонент приложения
// const App = () => {
//     return (
//         <div>
//             <h1>Страница со списком игр</h1>
//             <GameList />
//         </div>
//     );
// };
//
// export default App;
