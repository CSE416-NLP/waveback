import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import "../styles/css/index.css"
import { Link } from "react-router-dom";
import jsonData from "../TestData.json";

const ViewProfileScreen = (props) => {
    const [playlists, updatePlaylists] = useState(jsonData.Playlists);
    const firstUser = jsonData.Users[0];
    // console.log(playlists);
    // if (props.history.location.user) {
    //     console.log(props.history.location.user)
    // }
    // const user = useState(props.history.location.user);
    return (
        <div style={{ backgroundColor: "var(--background)" }}>
            <div className="viewProfileScreenContainer" >
                <div className="profileContainerLeft">
                    <div className="profileContainerTop">
                        <img className="profilePicture" src={firstUser.profilePicture} alt="" />
                        <div className="profileName"><h1>{firstUser.username}</h1></div>    
                    </div>
                    <div className="viewProfileInfoBackground">
                        <p className="viewProfileScreenLabel">Bio</p>
                        <div className="viewProfileTextArea" >{firstUser.bio}</div>
                        <p className="viewProfileScreenLabel">Location</p>
                        <div className="viewProfileTextArea" >{firstUser.location}</div>
                        <p className="viewProfileScreenLabel">Favorite Genres</p>
                        <div className="viewProfileTextArea" >{firstUser.favorite_genres}</div>
                        <p className="viewProfileScreenLabel">Favorite Artists</p>
                        <div className="viewProfileTextArea" >{firstUser.favorite_artists}</div>
                        <div className="followButtonContainer">
                            <button style={{color: "var(--background)", backgroundColor: "var(--buttonColor"}}
                            className="ui button massive followButton">Follow</button>
                        </div>
                    </div>
                </div>

                <div className="profileContainerRight" style={{ backgroundColor: "var(--background)" }}>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            {playlists.map((playlist, index) => (
                                <Grid.Column key={index}>
                                    <Link to={{ pathname: "/playlists/playlist/" + playlist.id, playlist: playlist }}>
                                        <div className='viewProfilePlaylists'>
                                            <img className="playlists_art" src={playlist.picture} alt="" />
                                            <div className='playlistInfo'>
                                                <h2>{playlist.name}</h2>
                                                <p className="playlistSubText">by {playlist.owner}</p>
                                                <p className="playlistSubText">{playlist.songs.length} song(s)</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default ViewProfileScreen;