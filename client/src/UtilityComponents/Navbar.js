import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/css/index.css"
import wavebackCircleLogo from '../images/WB Circle Logo V2.png';

const Navbar = (props) => {
    const currentUser = props.user;
    const defaultPicture = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ="

    return (
    <div className="navbar">
        <Link className="navbar_link" to="/">
            <div className="navbar_item"> <img src={wavebackCircleLogo} style={{filter: "hue-rotate(var(--hue))"}} className="App-logo-navbar" alt="Logo" /> </div>
        </Link>
        <Link className="navbar_link" to="/discover">
            <div className="navbar_item"> Discover </div>
        </Link>
        <Link className="navbar_link" to="/generate">
            <div className="navbar_item"> Generate </div>
        </Link>
        <Link className="navbar_link" to="/playlists">
            <div className="navbar_item"> Playlists </div>
        </Link>
        <Link className="navbar_link" to="/profile">
            <div className="navbar_item">
                <img src={currentUser ? currentUser.profilePicture : defaultPicture} className="App-logo-navbar userProfilePicture" alt="Profile picture" />
            </div>
        </Link>
    </div>
    );
};

export default Navbar;