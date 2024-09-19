import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import paimon from "../assets/paimon.png"
import primogem from "../assets/primogem.png"
import genshinFood from "../assets/genshinFood.png"


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="">
         The Wanmin Restaurant
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/recipes">
            <img
              src={genshinFood}
              alt="primo"
              id="textLogo"
            />
            Recipes
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <img src={primogem} alt="primo" id="textLogo" />
            My Favorites
          </Link>
        </li>
        <li>
          <Link to="/about">
            <img src={paimon} alt="paimon" />
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
