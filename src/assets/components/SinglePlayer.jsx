import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./components.css"

const SinglePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players/${id}`
        );
        setPlayers(response.data.data.player);
        console.log(response.data.data)
      } catch (error) {
        setError('didnt fetch players', error);
      }
    };
    fetchPlayer();
  }, [id]);

  const deletePlayer = async () => {
    try {
      await axios.delete(
        `https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players/${id}`
      );
      alert("Player deleted slay!");
      navigate("/"); 
    } catch (err) {
      console.error("deleting player went wrong:", err);
      alert("Failed to delete player... heavy sigh");
    }
  };
  

if (error) {
    return <p>Error: {error}</p>;
}
if (!players) {
    return <p>Loading...</p>
}


  return (
    <div className="SinglePlayerContainer">
     <h1> SinglePlayer </h1>
      <div className="PlayerDetails">
      <h2>{players.name}</h2>
      <img src={players.imageUrl} alt={players.name} />
      </div>
      <div className="PlayerInfo">
      <p>Breed: {players.breed}</p>
      <p>Team: {players.status}</p>
      <p>Id: {players.id}</p>
      </div>
      <button className="BackButton" onClick={deletePlayer}>Delete Player</button>
    </div>
  );
}
export default SinglePlayer;
