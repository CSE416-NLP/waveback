import React, { useEffect } from 'react';
import "../styles/css/index.css";
import { Button, Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom"
import Playlist from "../UtilityComponents/Playlist"
import { GET_DB_PLAYLISTS } from '../cache/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import * as mutations from '../cache/mutations';

const PlaylistsScreen = props => {
  let playlists = [];
  const { data, refetch } = useQuery(GET_DB_PLAYLISTS);
  if (data) {
    playlists = data.getAllPlaylists;
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  // const [, setPlaylists] = useState(props.user.playlists ? currentUser.playlists : []);

  const createNewPlaylist = async () => {
    let newPlaylist = {
      key: playlists.length,
      owner: props.user._id,
      name: "Unnamed Playlist",
      picture: "",
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
              <Link to={{ pathname: "/playlist/" + playlist._id, playlist: playlist, refreshList: refetch }}>
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
  // graphql()
  graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" })
)(PlaylistsScreen);