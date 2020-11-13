import React, { useState } from 'react';
import "../styles/css/index.css"
import { Grid } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import jsonData from "../TestData.json";
import SpotifyAuthWindow from "../SpotifyAuthWindow";
import { getSpotifyAccess, getSpotifyAccessToken, getSpotifyTokenExpirationTime } from "../LocalStorage";

var buttonStyle = {color: "var(--background)", backgroundColor: "var(--buttonColor"};

const DiscoverScreen = (props) => {
  console.log(getSpotifyTokenExpirationTime() - new Date().getTime());
  // console.log(props);
  window.addEventListener("storage", props.authorizeSpotifyFromStorage);
  let token = props.spotifyToken;
  const [playlists, updatePlaylists] = useState(jsonData.Playlists);
  const [filterTextState, changeFilterText] = useState("playlists");
  const columns = 2;

  const changeFilterButtonText = () => {
    let filterTextStateCopy = filterTextState;
    (filterTextStateCopy === "playlists") ? filterTextStateCopy = "songs" : filterTextStateCopy = "playlists";
    changeFilterText(filterTextStateCopy);
  }

  return (
    <div className="discoverScreen" style={{ backgroundColor: "var(--background)" }}>
      {!token && <SpotifyAuthWindow />}
      <div className="discoverSearchContainer">
        <p className="discoverTitleText">explore other users' creations</p>
        <div className="ui input">
          <input placeholder="Search.." size="40" className="discoverSearch" style={{ backgroundColor: "var(--secondary)" }}></input>
          <button type="submit" style={buttonStyle} className="clickButton fluid ui icon big button">
            <i className="search icon"></i>
          </button>
        </div>
      </div>

      <div className="discoverPlaylistGrid">
        <Grid columns={columns} divided>
          {playlists.map((playlist, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              <Link to={{ pathname: "/playlist/" + playlist.id, playlist: playlist, spotifyToken: token }}>
                <div className='playlists'>
                  <img className="playlists_art" src={playlist.picture} alt="" />
                  <div className='playlistInfo'>
                    <h2 className="playlistName">{playlist.name}</h2>
                    <p className="playlistSubTextDiscover">by {playlist.owner}</p>
                    <p className="playlistSubTextDiscover">{playlist.songs.length} song(s)</p>
                  </div>
                </div>
              </Link>
            </Grid.Column>
          ))}
        </Grid>
      </div>


      {/* <div className="discoverBottomContainer">
          <div className="discoverRandomContainer">
            <button className="clickButton ui huge button" style={buttonStyle}>Random Song</button>
          </div>
          <div className="discoverFilterContainer">
            <p className="discoverFilterText">Filter by</p>
            <button className="clickButton discoverFilterButton ui huge button" style={buttonStyle} onClick={changeFilterButtonText}>{filterTextState}</button>
          </div>
      </div> */}

    </div>
  );
};

export default DiscoverScreen;