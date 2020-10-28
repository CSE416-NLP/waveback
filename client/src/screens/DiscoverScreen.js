import React, { useState } from 'react';
import "../styles/css/index.css"
import { Grid } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import jsonData from "../TestData.json";

const DiscoverScreen = (props) => {
  const [playlists, updatePlaylists] = useState(jsonData.Playlists);
  console.log(playlists);
  const columns = 2;
  return (
    <div className="discoverScreen" style={{ backgroundColor: "var(--background)" }}>
      <div className="searchContainer ui input">
        <input placeholder="Search.." size="40" className="discoverSearch" style={{ backgroundColor: "var(--secondary)" }}></input>
        <button type="submit" style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="ui icon big button"><i className="search icon"></i></button>
      </div>

      <div className="discoverPlaylistGrid">

        <Grid columns={columns} divided>
          {playlists.map((playlist, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
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
        </Grid>
      </div>

    </div >
  );
};

export default DiscoverScreen;