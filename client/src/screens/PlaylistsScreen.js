import React, { useState, useEffect } from 'react';
import "../styles/css/index.css";
import { Button, Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom"
import Playlist from "../UtilityComponents/Playlist"
// import { GET_DB_PLAYLISTS } from '../cache/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import * as mutations from '../cache/mutations';
import { GET_USER_PLAYLISTS } from '../cache/mutations';
import { GET_DB_PLAYLISTS } from '../cache/queries';



const PlaylistsScreen = props => {
  const [playlists, setPlaylists] = useState([]);
  const { refetch } = useQuery(GET_DB_PLAYLISTS);

  useEffect(() => {
    async function loadPlaylists() {
      const { data } = await props.getUserPlaylists({ variables: { owner: props.user.username } });
      // console.log(data);
      setPlaylists(data.getUserPlaylists);
    }
    loadPlaylists();
  }, [refetch]);

  const createNewPlaylist = async () => {
    let newPlaylist = {
      key: playlists.length,
      owner: props.user.username,
      name: "Unnamed Playlist",
      picture: "http://copywritingcourse.com/wp-content/uploads/blank-cd-icon.png",
      description: "",
      songs: [],
      songURIs: [],
      followers: 0,
      visibility: props.user.defaultVisibility,
      tags: [],
      duration: 0
    }
    // Add playlist to database
    const { data } = await props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
    if (data.addPlaylist) {
      console.log(data.addPlaylist);
      console.log(props.user.username);
      props.history.push({
        pathname: '/playlist/' + data.addPlaylist,
        playlist: {
          _id: data.addPlaylist,
          ...newPlaylist
        },
        refreshList: refetch
      })
    }
  }

  const columns = 2;
  return (
    <div className="playlistsScreen" style={{ backgroundColor: "var(--background)" }}>
      <div className="playlistsSearchContainer ui input">
        <p className="discoverTitleText">my playlists</p>
        <div className="ui input">
          <input placeholder="Search.." size="40" className="playlistsSearch" style={{ backgroundColor: "var(--secondary)" }}></input>
          <button type="submit" className="clickButton fluid ui icon big button">
            <i className="search icon"></i>
          </button>
        </div>
      </div>

      <div className="playlists_container">
        <Grid columns={columns} divided>
          {playlists.map((playlist, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              <Link to={{ pathname: "/playlist/" + playlist._id, playlist: playlist }}>
                <Playlist playlist={playlist} />
              </Link>
            </Grid.Column>
          ))}
          <Grid.Column width={Math.floor(16 / columns)}>
            <div className='createPlaylistButtonContainer'>
              <Button onClick={createNewPlaylist} type="submit" className="clickButton fluid ui icon massive button">
                Create Playlist
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default compose(
  graphql(mutations.ADD_PLAYLIST, { name: 'addPlaylist' }),
  graphql(GET_USER_PLAYLISTS, { name: 'getUserPlaylists' }),
  graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" })
)(PlaylistsScreen);