import React from 'react';
import "../styles/css/index.css"
import { Grid } from 'semantic-ui-react'

const DiscoverScreen = (props) => {
  return (
    <div className="discoverScreen" style={{backgroundColor: "var(--background)"}}>
      <div className="searchContainer ui input">
        <input placeholder="Search.." size="40" className="discoverSearch" style={{backgroundColor: "var(--secondary)"}}></input>
        <button type="submit" className="ui icon black big button"><i className="search icon"></i></button>
      </div>

      <div className="discoverPlaylistGrid">
        <Grid columns={1} divded>
          <Grid.Row>
            <Grid.Column>
              <div className='playlistDiscover'>
                <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
                <div className='info'>
                  <h1>Nathan's Basketball Playlist</h1>
                  <p>Playlist for Nathan's Basketball!</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='playlistDiscover'>
                <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
                <div className='info'>
                  <h1>wahoo</h1>
                  <p>Tian's wahoo playlist</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='playlistDiscover'>
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
              <div className='playlistDiscover'>
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
              <div className='playlistDiscover'>
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
              <div className='playlistDiscover'>
                <img className="playlist_art" src='https://cdn.discordapp.com/attachments/689243098488111383/769750957985890324/Capture.PNG' alt=""/>
                <div className='info'>
                  <h1>The last playlist</h1>
                  <p>ha ha yeah wahoo</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    </div>
  );
};

export default DiscoverScreen;