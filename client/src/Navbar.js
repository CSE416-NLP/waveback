import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/css/index.css"
import wavebackCircleLogo from './images/WB Circle Logo V2.png';
import jsonData from "./TestData.json";

const Navbar = (props) => {
    const currentUser = jsonData.Users[0];

    return (
    <ul className="navbar">
        <Link className="navbar_link" to="/">
            <li className="navbar_item"> <img src={wavebackCircleLogo} style={{filter: "hue-rotate(var(--hue))"}} className="App-logo-navbar" alt="r" /> </li>
        </Link>
        <Link className="navbar_link" to="/discover">
            <li className="navbar_item"> Discover </li>
        </Link>
        <Link className="navbar_link" to="/generate">
            <li className="navbar_item"> Generate </li>
        </Link>
        <Link className="navbar_link" to="/playlists">
            <li className="navbar_item"> Playlists </li>
        </Link>
        <Link className="navbar_link" to="/profile">
            <li className="navbar_item"><img src={currentUser.profile_picture} className="App-logo-navbar userProfilePicture" alt="r" /></li>
        </Link>
    </ul>
    );
};

export default Navbar;