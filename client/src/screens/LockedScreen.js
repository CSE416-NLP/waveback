import React, { useState, useEffect } from 'react';
import { getSpotifyAccessToken } from "../data/LocalStorage.js";
import { useQuery } from '@apollo/react-hooks';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import jsonData from "../data/TestData.json";
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import * as mutations from '../cache/mutations';
import { isValidObjectId } from 'mongoose';

const ObjectId = require("mongoose").Types.ObjectId;


const LockedScreen = (props) => {
    const playlists = jsonData.Playlists;
    // console.log(playlists2);
    const resetDatabasePlaylists = () => {
       props.deleteAllPlaylists({ variables: {}, refetchQueries: [{query: GET_DB_PLAYLISTS}] });
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
            // if (data2.addPlaylist) {
            //     console.log(data2.addPlaylist);
            // }
            // refreshList: refetch
        });
    }

    const onClickHandler = (term) => { // Default is all fields, playlist generation may only use song search
        let token = getSpotifyAccessToken();
        console.log(token);
        token = "Bearer " + token;
        let query = "https://api.spotify.com/v1/search?q=" + term + "&type=track%2Cartist%2Calbum&market=US"

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
            });
    }

    const [searchTerm, setSearch] = useState("");
    return (
        <div className="App" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <div>

                <div>
                    <input value={searchTerm} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search.." className="discoverSearch"></input>
                    <button onClick={() => onClickHandler(searchTerm)}>Query Data in Console</button>
                    <button onClick={() => addPlaylistsToDatabase()}>Add Playlists to Database</button>
                    <button onClick={() => resetDatabasePlaylists()}>Delete All Playlists in Database</button>
                </div>

            </div>

        </div>
    );
};


export default compose(
    graphql(mutations.ADD_PLAYLIST, { name: 'addPlaylist' }),
    // graphql()
    graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" }),
    graphql(mutations.DELETE_ALL_PLAYLISTS, { name: "deleteAllPlaylists"})
  )(LockedScreen);