import React, { useState, useEffect } from 'react';
import "../styles/css/index.css"
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import SpotifyAuthWindow from "../UtilityComponents/SpotifyAuthWindow";
import Playlist from "../UtilityComponents/Playlist"
import { GET_DB_PLAYLISTS } from '../cache/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';

const DiscoverScreen = (props) => {
  let user = props.user.username;
  // console.log(user);
  let playlists = [];
  const { data, refetch } = useQuery(GET_DB_PLAYLISTS);
  if (data) {
    playlists = data.getAllPublicPlaylists;
  }
  useEffect(() => {
    refetch();
  }, [refetch]);

  window.addEventListener("storage", props.authorizeSpotifyFromStorage);
  let token = props.spotifyToken;
  const [filterTextState, changeFilterText] = useState("playlists");
  const columns = 2;

  // const changeFilterButtonText = () => {
  //   let filterTextStateCopy = filterTextState;
  //   (filterTextStateCopy === "playlists") ? filterTextStateCopy = "songs" : filterTextStateCopy = "playlists";
  //   changeFilterText(filterTextStateCopy);
  // }

  return (
    <div className="discoverScreen" style={{ backgroundColor: "var(--background)" }}>
      {!token && <SpotifyAuthWindow />}
      <div className="discoverSearchContainer">
        <p className="discoverTitleText">explore other users' creations</p>
        <div className="ui input">
          <input placeholder="Search..." size="40" className="discoverSearch" style={{ backgroundColor: "var(--secondary)" }}></input>
          <button type="submit" className="clickButton fluid ui icon big button">
            <i className="search icon"></i>
          </button>
        </div>
      </div>

      <div className="discoverPlaylistGrid">
        <Grid columns={columns} divided>
          {playlists.map((playlist, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              {user === playlist.owner ? 
              // <Link to={{ pathname: "/playlist/" + playlist.owner + '/' + playlist._id, playlist: playlist }}>
              //   <Playlist playlist={playlist} />
              // </Link> :
                <div> PENIS</div> :
              <Link to={{ pathname: "/viewplaylist/" + playlist.owner + '/' + playlist._id, playlist: playlist }}>
                <Playlist playlist={playlist} />
              </Link>}
              {/* <Link to={{ user === playlist.owner ? pathname: "/playlist/" + playlist._id, playlist: playlist }}>
                <Playlist playlist={playlist} />
              </Link> */}
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default compose(
  graphql(GET_DB_PLAYLISTS, { name: "getAllPublicPlaylists" })
)(DiscoverScreen);