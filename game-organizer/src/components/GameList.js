import React from 'react';
import { Link } from 'react-router-dom';

function GameList({ games, onDelete, onEdit }) {
  return (
    <div>
      <h2>Game List</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <h3>{game.title}</h3>
            <p>Platform: {game.platform}</p>
            <p>Genre: {game.genre}</p>
            <button onClick={() => onDelete(game.id)}>Delete</button>
            <Link to={`/edit/${game.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
