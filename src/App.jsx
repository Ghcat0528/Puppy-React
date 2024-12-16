import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import AllPlayers from "./assets/components/AllPlayers";
import SinglePlayer from "./assets/components/SinglePlayer";
import NewPlayerForm from "./assets/components/NewPlayerForm";
import NavBar from "./assets/components/NavBar";

import "./App.css";
import { grabPlayers } from "./API";
import axios from "axios";

function App() {
  const [players, setPlayers] = useState([]);
  const [filterPlayers, setFilterPlayers] = useState([]);
  

  const handleSearch = (searchTerm) => {
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterPlayers(filtered);
  };

  // const handlePlayerAdded = async () => {
  //  await getPlayers();
  // };

  const updatePlayers = (newPlayers) => {
    if(Array.isArray(newPlayers)) {
    setPlayers(newPlayers)
    setFilterPlayers(newPlayers);
    } else {
      console.error("Not an array", newPlayers)
    }
  };

  
    const getPlayers = async () => {
      try {
        const response = await axios.get('https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players');
        console.log("API Response:", response);
        const { success, data } = response.data;
        if(success && data?.players) {
      setPlayers(data.players);
      setFilterPlayers(data.players);
      console.log("Updated players:", data.players);
    } else {
      console.error("couldnt update players")
    }
    } catch (err) {
      console.error("Error refreshing players:", err);
    }
  };

  const handlePlayerAdded = async () => {
    console.log("handlePlayerAdded triggered");
    await getPlayers();
   };
// const handlePlayerDeleted = async (playerId) => {
//   try {
//     await axios.delete(`/api/players/${playerId}`);
//     await getPlayers();
//   } catch (error) {
//     console.error ("didnt delete player...", error)
//   }
// }

useEffect (() => {
    getPlayers();
  }, []);



  return (
    <>
      <BrowserRouter>
      <NavBar onSearch={handleSearch} />
        <Routes>
          <Route  path="/" 
      element={<AllPlayers 
      filterPlayers={filterPlayers}
      updatePlayers={updatePlayers} 
       />} />

          <Route path="/players/:id" element={<SinglePlayer />} />

          <Route
            path="/add-player"
            element={<NewPlayerForm onPlayerAdded={handlePlayerAdded} />}
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
