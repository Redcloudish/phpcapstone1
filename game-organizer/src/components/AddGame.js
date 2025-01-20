import React, { useState } from 'react';

function AddGame({ onAdd }) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [dateMade, setDateMade] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!title || !platform || !dateMade || !genre) {
      alert('Please fill out all fields.');
      return;
    }

    const newGame = { 
      title, 
      platform, 
      date_made: dateMade, 
      genre 
    };

    console.log("Submitting game:", newGame); // Debugging log to check what is being sent
    onAdd(newGame); // Send to parent (App.js)
    setTitle('');
    setPlatform('');
    setDateMade('');
    setGenre('');
  };

  return (
    <div>
      <h2>Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date Made"
          value={dateMade}
          onChange={(e) => setDateMade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default AddGame;
