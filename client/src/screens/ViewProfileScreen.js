import React from 'react';
import { Grid } from 'semantic-ui-react';
import "../styles/css/index.css"
import { Link } from "react-router-dom";
import jsonData from "../data/TestData.json"
import { getAlbumTime } from "../UtilityComponents/Playlist";

const arrayToString = (array) => {
    let str = "";
    for (let element of array)
        str += element + ", ";
    if (str.length >= 1 && str.charAt(str.length - 1) === " ")
        str = str.substring(0, str.length - 2);
    return str;
}

const ViewProfileScreen = (props) => {
    console.log(props);
    const user = props.location.user;
    const playlists = jsonData.Playlists;

    const invalidImage = (e) => {
        e.target.src = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ=";
    }

    return (
        <div className="viewProfileScreenOutermost">
            <div className="profileContainerLeft">
                <div className="profileContainerTop">
                    <img onError={invalidImage} style={{ objectFit: "cover" }} src={user ? user.profilePicture : invalidImage} className="myProfilePicture" alt="" />
                    <div className="profileName"><p>{user.username}</p></div>
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

            <div className="profileRightScrollContainer">
                <div className="profileContainerRight" style={{ backgroundColor: "var(--background)" }}>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            {playlists.map((playlist, index) => (
                                <Grid.Column key={index}>
                                    <Link to={{ pathname: "/playlist/" + playlist.id, playlist: playlist }}>
                                        <div className='viewProfilePlaylists'>
                                            <img className="viewProfilePlaylistPic" src={playlist.picture} alt="" />
                                            <div className='viewProfilePlaylistInfo'>
                                                <h2 className="playlistTitleText">{playlist.name}</h2>
                                                <p className="playlistSubText">{playlist.songs.length} song{playlist.songs.length === 1 ? "" : "s"}, {getAlbumTime(playlist.songs)}</p>
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
