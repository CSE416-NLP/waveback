import React, { useState } from 'react';
import "../styles/css/index.css"
import { Grid, GridColumn, Image } from 'semantic-ui-react'

const PlaylistsScreen = (props) => {

  const [playlists, updatePlaylists] = useState([{
    name: "",
    owner: "",
  }]);

  const handleAddPlaylist = () => {
    let playlists = [...playlists];
    playlists.push({
      name: "playlist",
      owner: "",
    })
    updatePlaylists(playlists);
  }

  const handleDeletePlaylist = (e) => {
    let name = e.target.getAttribute("name");
    updatePlaylists(playlists.filter(item => item.name !== name));
  }

  return (
    <div className="playlistScreen">
      <Grid columns='four'>
        <Grid.Row className="playlistRow">
          <Grid.Column>
            <Image className="playlist_art" src='https://images-na.ssl-images-amazon.com/images/I/61LYfqeXUDL._AC_SX522_.jpg' />
          </Grid.Column>
          <GridColumn>
            Wish You Were Here
          </GridColumn>
          <Grid.Column>
            <Image className="playlist_art" src='https://images-na.ssl-images-amazon.com/images/I/81VcA8-kuZL._SX425_.jpg' />
          </Grid.Column>
          <Grid.Column>
            To Pimp A Butterfly
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="playlistRow">
          <Grid.Column>
            <Image className="playlist_art" src="https://target.scene7.com/is/image/Target/GUEST_4992dc44-ec22-4252-b2a5-5d45a6d839b9" />
          </Grid.Column>
          <Grid.Column>
            Jazz Playlist!
          </Grid.Column>
          <Grid.Column>
            <Image className="playlist_art" src='https://images-na.ssl-images-amazon.com/images/I/616%2BEud1OqL._SX355_.jpg' />
          </Grid.Column>
          <Grid.Column>
            Prog Playlist!
          </Grid.Column>

        </Grid.Row>
      </Grid.Column>
    </div>

  );
};

export default PlaylistsScreen;