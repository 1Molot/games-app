import React from 'react';
//  import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// //
// // Компонент страницы списка игр
// const GameListPage = () => {
//     // Здесь вы можете использовать GameList компонент из предыдущего кода
//
//     return (
//         <div>
//             <h1>Страница со списком игр</h1>
//             <GameList />
//         </div>
//     );
// };
//
// // Компонент страницы отдельной игры
// const GameDetailsPage = ({ match }) => {
//     const gameId = match.params.id;
//
//     // Здесь вы можете использовать компонент GameItem для отображения деталей отдельной игры
//
//     return (
//         <div>
//             <h1>Детали игры {gameId}</h1>
//             {/* Вставьте компонент GameItem с передачей данных об отдельной игре */}
//         </div>
//     );
// };
//
// const App = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route exact path="/" component={GameListPage} />
//                 <Route path="/game/:id" component={GameDetailsPage} />
//             </Switch>
//         </Router>
//     );
// };
//
// export default App;
