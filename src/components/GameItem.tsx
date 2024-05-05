import React from 'react';
import { GameLister } from '../types/types';
import { tags } from '../constants/constantTags';
import './GameItem.css';

type GameItemProps = {
  game: GameLister;
};

export const GameItem = ({ game }: GameItemProps) => {
  return (
    <div key={game.id} className="game-card">
      <img src={game.background_image} alt={game.name} />
      <h3>{game.name}</h3>
      <p>Рейтинг: {game.rating}</p>
      <p>Платформы: {game.parent_platforms.map((p) => p.platform.name).join(', ')}</p>
      <p>Жанры: {game.genres.map((genre) => genre.name).join(', ')}</p>
      <p>Язык: {Array.from(new Set(game.tags.map((tag) => tags[tag.language] || '')))}</p>
      <p>Количество игроков: {game.tags.find((tag) => tag.slug === 'multiplayer')?.games_count || 0}</p>
    </div>
  );
};
