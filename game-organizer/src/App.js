import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddGame from './components/AddGame';
import EditGame from './components/EditGame';
import GameList from './components/GameList';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/GameOrganizerapi/get_games.php') // Correct folder name here
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setGames(response.data);
        } else {
          console.error("Unexpected response format:", response);
        }
      })
      .catch(error => {
        console.error("Error fetching games:", error);
      });
  }, []);
  
  

  const addGame = (newGame) => {
    console.log("Sending to backend:", newGame); // Debugging log to check what is being sent

    axios
      .post('http://localhost/GameOrganizerapi/add_game.php', newGame)
      .then(response => {
        if (response.data.success) {
          // If the game is added successfully, update the games state
          setGames(prevGames => [...prevGames, newGame]);
        } else {
          console.error("Error adding game:", response.data.message);
        }
      })
      .catch(error => {
        console.error("Error adding game:", error);
      });
  };
  

  const deleteGame = (id) => {
    axios
      .post('http://localhost/GameOrganizerapi/delete_game.php', { id })
      .then(response => {
        if (response.data.success) {
          setGames(prevGames => prevGames.filter(game => game.id !== id));
        } else {
          console.error("Error deleting game:", response.data.message);
        }
      })
      .catch(error => {
        console.error("Error deleting game:", error);
      });
  };

  const editGame = (updatedGame) => {
    axios
      .post('http://localhost/GameOrganizerapi/edit_game.php', updatedGame)
      .then(response => {
        if (response.data.success) {
          setGames(prevGames =>
            prevGames.map(game => game.id === updatedGame.id ? updatedGame : game)
          );
        } else {
          console.error("Error editing game:", response.data.message);
        }
      })
      .catch(error => {
        console.error("Error editing game:", error);
      });
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <Navbar />

      {/* App Routes */}
      <Routes>
        {/* Home Route: Display game list with title "Game Organizer" */}
        <Route
          path="/"
          element={
            <div>
              <h1>Game Organizer</h1> {/* Added custom title here */}
              <GameList
                games={games}
                onDelete={deleteGame}
                onEdit={editGame}
              />
            </div>
          }
        />

        {/* Add Game Route */}
        <Route
          path="/add"
          element={<AddGame onAdd={addGame} />}
        />

        {/* Edit Game Route */}
        <Route
          path="/edit/:id"
          element={<EditGame games={games} onEdit={editGame} />}
        />
      </Routes>
    </div>
  );
}

export default App;

