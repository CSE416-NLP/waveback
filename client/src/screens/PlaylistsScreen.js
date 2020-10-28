import React, { useState } from 'react';
import "../styles/css/index.css";
import { Grid } from 'semantic-ui-react';
import jsonData from "../TestData.json";
import { Link } from "react-router-dom"

const PlaylistsScreen = (props) => { 
  console.log(jsonData.Playlists);
  const [playlists, updatePlaylists] = useState(jsonData.Playlists);

  // const handleAddPlaylist = () => {
  //   let playlists = [...playlists];
  //   playlists.push({
  //     name: "playlist",
  //     owner: "",
  //   })
  //   updatePlaylists(playlists);
  // }

  // const handleDeletePlaylist = (e) => {
  //   let name = e.target.getAttribute("name");
  //   updatePlaylists(playlists.filter(item => item.name !== name));
  // }

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
                  <div className='info'><h1>{playlist.name}</h1><p>Owner: {playlist.owner}</p><p>Number of songs: {playlist.songs.length}</p></div>
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