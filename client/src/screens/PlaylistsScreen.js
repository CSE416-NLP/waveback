import React, { useState } from 'react';
import "../styles/css/index.css"
import { Grid } from 'semantic-ui-react'

const PlaylistsScreen = (props) => {
  const [playlists, updatePlaylists] = useState([{
    name: "",
    owner: "",
  }]);

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

  return (
    <div className="playlistsScreen" style={{ backgroundColor: "var(--background)" }}>
      <div className="playlistsSearchContainer ui input">
        <input placeholder="Search.." size="40" className="playlistsSearch" style={{ backgroundColor: "var(--secondary)" }}></input>
        <button type="submit" style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="ui icon big button"><i className="search icon"></i></button>
      </div>
      <div className="playlists_container">
        <Grid columns={3} divided>
          <Grid.Row className="playlists_row">
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="playlists_row">
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="playlists_row">
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    </div>

  );
};

export default PlaylistsScreen;