import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./styles/css/index.css"
import wavebackCircleLogo from './images/WB Circle Logo V2.png';
import tempProfileImage from './images/temporary profile image.png';


const Navbar = (props) => {

  return (
    <ul className="navbar">
        <Link to="/">
            <li className="navbar_item"> <img src={wavebackCircleLogo} className="App-logo-navbar" alt="r" /> </li>
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
            <li className="navbar_item"> <img src={tempProfileImage} className="App-logo-navbar" alt="r" /> </li>
        </Link>
    </ul>


  );
};

export default Navbar;