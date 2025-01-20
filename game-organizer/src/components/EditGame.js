import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditGame({ onEdit }) {
  const { id } = useParams();
  const [game, setGame] = useState({ title: '', platform: '', date_made: '', genre: '' });

  useEffect(() => {
    axios.get(`http://localhost/applications/xampp/htdocs/gameorganizerapi/get_game_by_id.php?id=${id}`)
      .then(response => {
        setGame(response.data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedGame = { ...game, id };
    onEdit(updatedGame);
  };

  return (
    <div>
      <h2>Edit Game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={game.title}
          onChange={(e) => setGame({ ...game, title: e.target.value })}
        />
        <input
          type="text"
          value={game.platform}
          onChange={(e) => setGame({ ...game, platform: e.target.value })}
        />
        <input
          type="text"
          value={game.date_made}
          onChange={(e) => setGame({ ...game, date_made: e.target.value })}
        />
        <input
          type="text"
          value={game.genre}
          onChange={(e) => setGame({ ...game, genre: e.target.value })}
        />
        <button type="submit">Update Game</button>
      </form>
    </div>
  );
}

export default EditGame;
