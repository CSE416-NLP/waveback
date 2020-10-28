import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import "../styles/css/index.css"
import { Link } from "react-router-dom";
import jsonData from "../TestData.json";

const ViewProfileScreen = (props) => {
    const [playlists, updatePlaylists] = useState(jsonData.Playlists);
    console.log(playlists);
    // if (props.history.location.user) {
    //     console.log(props.history.location.user)
    // }
    // const user = useState(props.history.location.user);
    return (
        <div className="viewProfileScreenContainer">
            <div className="profileContainer">
                <img className="profilePicture" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className="profileName"><h1>Epic Man</h1></div>
            </div>
            <p className="viewProfileScreenLabel">Bio</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>I WAS BORN IN THE WRONG GENERATION I ONLY LISTEN TO REAL MUSIC</div>
            <p className="viewProfileScreenLabel">Location</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>New York, New York</div>
            <p className="viewProfileScreenLabel">Favorite Genres</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>RIGHT GENERATION MUSIC</div>
            <p className="viewProfileScreenLabel">Favorite Artists</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>TWENTY PILOTS</div>
            <p className="viewProfileScreenLabel">My Playlists:</p>
            <Grid columns={3} divided>
                <Grid.Row>
                    {playlists.map((playlist, index) => (
                        <Grid.Column key={index}>
                            <Link to={{ pathname: "/playlists/playlist/" + playlist.id, playlist: playlist }}>
                                <div className='playlists'>
                                    <img className="playlists_art" src={playlist.picture} alt="" />
                                    <div className='playlistInfo'>
                                        <h2>{playlist.name}</h2>
                                        <p className="playlistSubText">by {playlist.owner}</p>
                                        <p className="playlistSubText">{playlist.songs.length} songs</p>
                                    </div>
                                </div>
                            </Link>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>

        </div>


    );
};

export default ViewProfileScreen;