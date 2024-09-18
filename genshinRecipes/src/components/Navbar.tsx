import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
              src="../src/assets/genshinFood.png"
              alt="primo"
              id="textLogo"
            />
            Recipes
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <img src="../src/assets/star.png" alt="primo" id="textLogo" />
            My Favorites
          </Link>
        </li>
        <li>
          <Link to="/about">
            <img src="../src/assets/paimon.png" alt="paimon" />
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
