import React, { useState } from "react";
import { grabPlayers } from "../../API";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function NewPlayerForm({ onPlayerAdded }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("bench");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createPlayer = async (newPlayerData) => {
    try {
        console.log("Submitting new player data:", newPlayerData);
      const response = await axios.post(
        "https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players",
        newPlayerData
      );
      return response.data;
    } catch (error) {
      console.error("Player wasnt created", error);
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  const newPlayer = { name, breed, status, cohortId: 22 };
  console.log("Submitting new player data:", newPlayer);  
   
    
    try {
      await createPlayer(newPlayer);
      setSuccess(true);
      setName("");
      setBreed("");
      setStatus("");
      setError(null);

      if (onPlayerAdded) await onPlayerAdded();
      navigate("/");
    } catch (err) {
        console.error("Error creating player:", err);
    setError("Something went wrong when creating the player");
    setSuccess(false);

    }
  };

  return (
    <div>
      <h2>Create New Player</h2>

      <form className="New" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div>
     <label>Status:</label>
       <select value={status} onChange={(e) => setStatus(e.target.value)} required>
       <option value="bench">Bench</option>
       <option value="field">Field</option>
     </select>
        </div>
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

