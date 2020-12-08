import React, { useState } from 'react';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import jsonData from "../data/TestData.json";
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import * as mutations from '../cache/mutations';
import { Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { getSpotifyAccessToken } from "../data/LocalStorage.js";

const ObjectId = require("mongoose").Types.ObjectId;


const LockedScreen = (props) => {
    const users = jsonData.Users;
    const columns = 2;
    const playlists = jsonData.Playlists;
    // console.log(playlists2);

    const resetDatabasePlaylists = () => {
        props.deleteAllPlaylists({ variables: {}, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
    }

    const addPlaylistsToDatabase = () => {
        playlists.forEach(playlist => {
            let songs = playlist.songs;
            for (let i = 0; i < songs.length; i++) {
                if (!songs[i]._id)
                    songs[i]._id = new ObjectId();
            }
            const newPlaylist = {
                key: playlist.key,
                owner: playlist.owner,
                name: playlist.name,
                picture: playlist.picture,
                description: playlist.descdription,
                songs: songs,
                songURIs: playlist.songURIs,
                followers: playlist.followers,
                visibility: playlist.visibility,
                tags: playlist.tags,
                duration: playlist.duration,
            }
            for (let i = 0; i < songs.length; i++) {
                if (!songs[i]._id)
                    songs[i]._id = new ObjectId();
            }
            console.log(newPlaylist);

            props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
        });
    }
    const searchSpotify = (term) => { // Default is all fields, playlist generation may only use song search
        // if (term === "") return;
        let token = getSpotifyAccessToken();
        token = "Bearer " + token;
        // let query = "https://api.spotify.com/v1/search?q=" + term + "&type=track%2Cartist%2Calbum&market=US"
        // let query = "https://api.spotify.com/v1/browse/categories/rap/playlists?country=US&limit=10"
        let query = "https://api.spotify.com/v1/browse/categories"
        fetch(query, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    const deleteUser = async (user) => {
        console.log("DELETE USER: " + user.username + " WITH ID: " + user._id);
        // TODO: Remove this print statement and hook this up to the database.
        // props.deleteUser({ variables: { _id: user._id} });
        // props.history.push({ pathname: '/playlists' });
        // refetch();
    }

    // const [searchTerm, setSearch] = useState("");
    return (
        <div className="adminScreen" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <br></br><br></br>
            <div>
                <button className="clickButton ui button" onClick={() => addPlaylistsToDatabase()}>Add Playlists to Database</button>
                <button className="clickButton ui button" onClick={() => resetDatabasePlaylists()}>Delete All Playlists in Database</button>
            </div>
            <button onClick={searchSpotify}>spotify test</button>

            <br></br><br></br>
            <h2>List Of All Users</h2>
            <div className="profileScreenScrollContainer">
                <Grid columns={columns} divided>
                    {users.map((user, index) => (
                        <Grid.Column width={Math.floor(16 / columns)} key={index}>
                            <div className="adminUserList" >
                                <img className="profilePicture" src={user.profilePicture} alt="" />
                                <div className='profileFollowingInfo'>
                                    <h2>{user.username}</h2>
                                    <Link to={{ pathname: "/profile/" + user._id, user: user }}>
                                        <Icon className="big" name="user" ></Icon>
                                    </Link>
                                    <Icon className="removeSongIcon big" onClick={() => deleteUser(user)} name="trash" ></Icon>
                                </div>
                            </div>
                        </Grid.Column>
                    ))}
                </Grid>
            </div>

        </div>
    );
};


export default compose(
    graphql(mutations.ADD_PLAYLIST, { name: 'addPlaylist' }),
    graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" }),
    graphql(mutations.DELETE_ALL_PLAYLISTS, { name: "deleteAllPlaylists" }),
    graphql(mutations.DELETE_USER, { name: "deleteUser" })
)(LockedScreen);