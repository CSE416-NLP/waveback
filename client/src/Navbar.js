import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/css/index.css"
import wavebackCircleLogo from './images/WB Circle Logo V2.png';

const Navbar = (props) => {
    const currentUser = props.user;

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
            <li className="navbar_item"><img src={currentUser ? currentUser.profilePicture : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ="} className="App-logo-navbar userProfilePicture" alt="" /></li>
        </Link>
    </ul>
    );
};

export default Navbar;