import React, { useState } from "react";
import { Link } from "react-router-dom";


 function NavBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};
const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
    onSearch(searchTerm);
    }
};

  return (
    <nav>
        <header>Puppy Bowl</header>
        <form onSubmit={handleSubmit}>

        </form>
        <div className="Home">
          <Link to="/">Home</Link>
          </div>
        <div className="Add"><Link to="/add-player">Add Player</Link></div>
          
    </nav>
  );
}

export default NavBar;
