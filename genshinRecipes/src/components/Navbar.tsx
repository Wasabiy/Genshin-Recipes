import React from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><Link to=""><img src="../src/assets/logo.png" alt="logo" />Wanmin Restaurant</Link></div>
      <ul className="navbar-links">
        <li>
          <img src="../src/assets/primogem.png" alt="primo" id="textLogo" />
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <img src="../src/assets/slime.png" alt="primo" id="textLogo" />
          <Link to="/favorites">My Favorites</Link>
        </li>
        <li>
          <img src="../src/assets/paimon.png" alt="paimon" />
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
