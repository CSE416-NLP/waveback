import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLOR_SCHEMES } from './styles/colorSchemes'
import "./styles/css/index.css"

const Navbar = (props) => {
  const changeStyle = (style) => {
    document.documentElement.style.setProperty("--primary", style.primary);
    document.documentElement.style.setProperty("--secondary", style.secondary);
    document.documentElement.style.setProperty("--tertiary", style.tertiary);
    document.documentElement.style.setProperty("--accent", style.accent);
    document.documentElement.style.setProperty("--background", style.background);
  }

  return (
    <ul className="navbar">
        <Link to="/">
            <li className="navbar_item"> Home </li>
        </Link>
        <Link to="/Discover">
            <li className="navbar_item"> Discover </li>
        </Link>
        <Link to="/Generate">
            <li className="navbar_item"> Generate </li>
        </Link>
        <Link to="/Playlists">
            <li className="navbar_item"> Playlists </li>
        </Link>
        <Link to="/Profile">
            <li className="navbar_item"> Profile </li>
        </Link>
        <select onChange={(e) => {
            changeStyle(COLOR_SCHEMES[e.target.value])
        }}>
            <option value={"1950s"}>1950s</option>
            <option value={"1960s"}>1960s</option>
            <option value={"1970s"}>1970s</option>
            <option value={"1980s"}>1980s</option>
            <option value={"1990s"}>1990s</option>
            <option value={"2000s"}>2000s</option>
            <option value={"2010s"}>2010s</option>
        </select>
    </ul>
  );
};

export default Navbar;