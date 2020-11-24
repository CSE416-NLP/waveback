import React from 'react';
import { Grid } from 'semantic-ui-react';
import "../styles/css/index.css"
import { Link } from "react-router-dom";
import jsonData from "../data/TestData.json"

const arrayToString = (array) => {
    let str = "";
    for (let element of array)
        str += element + ", ";
    if (str.length >= 1 && str.charAt(str.length - 1) === " ")
        str = str.substring(0, str.length - 2);
    return str;
}

const ViewProfileScreen = (props) => {
    console.log(props)
    const user = props.location.user;
    // const playlists = user.playlists
    const playlists = jsonData.Playlists

    return (
        <div className="viewProfileScreen">
            <div className="viewProfileScreenContainer" >
                <div className="profileContainerLeft">
                    <div className="profileContainerTop">
                        <img className="profilePicture" src={user.profilePicture} alt="" />
                        <div className="profileName"><h1>{user.username}</h1></div>
                    </div>
                    <div className="viewProfileInfoBackground">
                        <p className="viewProfileScreenLabel">Bio</p>
                        <div className="viewProfileTextArea" >{user.bio}</div>
                        <p className="viewProfileScreenLabel">Location</p>
                        <div className="viewProfileTextArea" >{user.location}</div>
                        <p className="viewProfileScreenLabel">Favorite Genres</p>
                        <div className="viewProfileTextArea" >{arrayToString(user.favoriteGenres)}</div>
                        <p className="viewProfileScreenLabel">Favorite Artists</p>
                        <div className="viewProfileTextArea" >{arrayToString(user.favoriteArtists)}</div>
                        <div className="followButtonContainer">
                            <button className="clickButton ui button massive followButton">Follow</button>
                        </div>
                    </div>
                </div>

                <div className="profileContainerRight" style={{ backgroundColor: "var(--background)" }}>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            {playlists.map((playlist, index) => (
                                <Grid.Column key={index}>
                                    <Link to={{ pathname: "/playlist/" + playlist.id, playlist: playlist }}>
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
