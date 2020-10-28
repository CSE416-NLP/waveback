import React, { useState } from 'react';
import "../styles/css/index.css";
import { Grid } from 'semantic-ui-react';
import jsonData from "../TestData.json";
import { Link } from "react-router-dom"

const PlaylistsScreen = (props) => { 
  const [playlists, updatePlaylists] = useState(jsonData.Playlists);

  const columns = 3;
  return (
    <div className="playlistsScreen" style={{ backgroundColor: "var(--background)" }}>
      <div className="playlistsSearchContainer ui input">
        <input placeholder="Search.." size="40" className="playlistsSearch" style={{ backgroundColor: "var(--secondary)" }}></input>
        <button type="submit" style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="ui icon big button"><i className="search icon"></i></button>
      </div>
      <div className="playlists_container">
        <Grid columns={columns} divided>
          {playlists.map((playlist, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              <Link to={{ pathname: "/playlists/playlist/" + playlist.id, playlist: playlist}}>
              <div className='playlists'>
                <img className="playlists_art" src={playlist.picture} alt="" />
                  <div className='playlistInfo'>
                    <h2 className="playlistName">{playlist.name}</h2>
                    <p className="playlistSubText">by {playlist.owner}</p>
                    <p className="playlistSubText">{playlist.songs.length} song(s)</p>
                  </div>
              </div>
              </Link>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default PlaylistsScreen;