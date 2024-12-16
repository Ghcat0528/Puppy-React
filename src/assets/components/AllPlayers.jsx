import { useState, useEffect } from "react";
import { grabPlayers } from "../../API";
import { useNavigate } from "react-router-dom";
import NewPlayerForm from "./NewPlayerForm";



export default function AllPlayers({ filterPlayers, updatePlayers, refreshPlayers, error }) {
  const [searchTerm, setSearchTerm] = useState('');
  console.log("Rendering AllPlayers with filtered players:", filterPlayers);
  const navigate = useNavigate();

  const getPlayers = async () => {
    try {
        const response = await grabPlayers(); 
        console.log("Response from grabPlayers:", response); 
        const playersArray = response?.data?.players || []; 
        console.log("Players array:", playersArray);
        updatePlayers(playersArray); 
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };
    
     useEffect(() => {
        getPlayers();
      }, []);
      

      const filteredPlayers = Array.isArray(filterPlayers)
    ? filterPlayers.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
     

  return (
    <div className="AllPlayers">
       
      <h1>All Players</h1>
      <input className="Search"
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

{error ? (
        <p>Error: {error}</p>
      ) : filteredPlayers.length > 0 ? (
        <ul className="ul">
          {filteredPlayers.map((player) => (
            <li key={player.id}>
              {player.name}
              <button onClick={() => navigate(`/players/${player.id}`)}>
                See Details?
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No players found!</p>
      )}

     
    </div>
  );
}