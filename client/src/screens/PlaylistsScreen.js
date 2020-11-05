import React, { useEffect } from 'react';
import "../styles/css/index.css";
import { Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom"
import { GET_DB_PLAYLISTS } from '../cache/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import * as mutations from '../cache/mutations';

// import jsonData from "../TestData.json";

// import { useHistory } from "react-router-dom";
const PlaylistsScreen = props => {

  let playlists = [];
  const { data, refetch } = useQuery(GET_DB_PLAYLISTS);
  if (data) {
    // console.log(data.getAllPlaylists);
    playlists = data.getAllPlaylists;
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  // const currentUser = props.user;
  // console.log(currentUser.playlists);
  // const [, setPlaylists] = useState(props.user.playlists ? currentUser.playlists : []);
  var date = new Date();

  const createNewPlaylist = async () => {
    let newPlaylist = {
      key: playlists.length,
      owner: props.user._id,
      name: "Unnamed Playlist",
      picture: "",
      description: "",
      songs: [],
      followers: 0,
      visibility: props.user.defaultVisibility,
      tags: [],
      duration: 0
    }
    // Add playlist to database

    const { data } = await props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
    if (data.addPlaylist) {
      props.history.push({
        pathname: '/playlists/playlist/' + data.addPlaylist,
        playlist: {
          _id: data.addPlaylist,
          ...newPlaylist
        },
        refreshList: refetch
      })
    }
  }

  const columns = 3;
  return (
    <div className="playlistsScreen" style={{ backgroundColor: "var(--background)" }}>

      <div className="playlistsSearchContainer ui input">
        <p className="discoverTitleText">my playlists</p>
        <div className="ui input">
          <input placeholder="Search.." size="40" className="playlistsSearch" style={{ backgroundColor: "var(--secondary)" }}></input>
          <button type="submit" style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="fluid ui icon big button">
            <i className="search icon"></i>
          </button>
        </div>
      </div>

      <div className="playlists_container">
        <Grid columns={columns} divided>
          {playlists.map((playlist, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              <Link to={{ pathname: "/playlists/playlist/" + playlist.id, playlist: playlist }}>
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
          <Grid.Column width={Math.floor(16 / columns)}>
            <div className='createPlaylistButton'>
              <button onClick={createNewPlaylist} type="submit" style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="fluid ui icon massive button">
                Create Playlist
                </button>
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
  graphql(GET_DB_PLAYLISTS, {name: "getDBPlaylists"})
)(PlaylistsScreen);