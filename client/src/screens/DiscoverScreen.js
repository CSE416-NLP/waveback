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
  const [filter, setFilter] = useState("");
  const columns = 2;

  let filteredPlaylists = playlists.filter(playlist => playlist.name.toLowerCase().substring(0, filter.length).includes(filter.toLowerCase()));
  let renderPlaylists = [];
  for (let i = 0; i < filteredPlaylists.length; i += columns) {
    renderPlaylists[renderPlaylists.length] = filteredPlaylists.slice(i, i + columns);
  }
  // console.log(renderPlaylists)

  return (
    <div className="discoverScreen" style={{ backgroundColor: "var(--background)" }}>
      {!token && <SpotifyAuthWindow />}
      <div className="discoverSearchContainer">
        <p className="discoverTitleText">explore other users' creations</p>
        <div className="ui input">
          <input placeholder="Filter Playlists..." size="40" className="discoverSearch" style={{ backgroundColor: "var(--secondary)" }}
            value={filter} onChange={(e) => setFilter(e.target.value)} />
          <button type="submit" className="clickButton fluid ui icon big button">
            <i className="search icon"></i>
          </button>
        </div>
      </div>

      <div className="discoverPlaylistGrid">
        <Grid columns={columns} divided>
          {/* <Grid.Row>
            <Grid.Column width={16}>
              {playlists.length > 0 &&
              <Playlist playlist={playlists[0]} />
              }
            </Grid.Column>
          </Grid.Row> */}
          {renderPlaylists.map((row, i) => (
            <Grid.Row stretched key={i}>
              {row.map((playlist, index) => (
                <Grid.Column width={i !== renderPlaylists.length ? Math.floor(16 / columns) : 16} key={index}>
                  {user === playlist.owner ?
                    <Link to={{ pathname: "/playlist/" + playlist.owner + '/' + playlist._id, playlist: playlist }}>
                      <Playlist playlist={playlist} />
                    </Link> :
                    <Link to={{ pathname: "/viewplaylist/" + playlist.owner + '/' + playlist._id, playlist: playlist }}>
                      <Playlist playlist={playlist} />
                    </Link>}
                </Grid.Column>
              ))}
            </Grid.Row>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default compose(
  graphql(GET_DB_PLAYLISTS, { name: "getAllPublicPlaylists" })
)(DiscoverScreen);