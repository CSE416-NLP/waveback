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
    // <div className="playlistScreen">
    <Grid columns={2} divded>
      <Grid.Row>
        <Grid.Column>
          <div className='playlist'>
            <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
            <div className='info'>
              <h1>Jihu's Pee Pee</h1>
              <p>Jihu's Pee Pee is really big</p>
            </div>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div className='playlist'>
            <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
            <div className='info'>
              <h1>Jihu's Pee Pee</h1>
              <p>Jihu's Pee Pee is really big</p>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <div className='playlist'>
            <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
            <div className='info'>
              <h1>Jihu's Pee Pee</h1>
              <p>Jihu's Pee Pee is really big</p>
            </div>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div className='playlist'>
            <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
            <div className='info'>
              <h1>Jihu's Pee Pee</h1>
              <p>Jihu's Pee Pee is really big</p>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  );
};

export default PlaylistsScreen;