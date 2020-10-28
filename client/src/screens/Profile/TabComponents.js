import { Grid, Form, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';
import "../../styles/css/index.css";
import jsonData from "../../TestData.json";

export const MyProfile = (props) => {
  const currentUser = jsonData.Users[0];

  return (
    <div className="profileScreenMainContainer">
      <p className="profileScreenSubText">Bio</p>
      <Form>
        <TextArea className="profileTextArea" rows={6} style={{ backgroundColor: "var(--secondary)" }} placeholder="Tell us about yourself" defaultValue={currentUser.bio}/>
      </Form>
      <p className="profileScreenSubText">Location</p>
      <Form>
        <TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} placeholder="Where do you call home?" defaultValue={currentUser.location}/>
      </Form>
      <p className="profileScreenSubText">Favorite Genres</p>
      <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.favorite_genres}/></Form>
      <p className="profileScreenSubText">Favorite Artists</p>
      <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.favorite_artists}/></Form>
      <p className="profileScreenSubText">Favorite Songs</p>
      <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.favorite_songs}/></Form>
    </div>
  )
}

export const Following = (props) => {
  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
        <input placeholder="Search for a user..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"></input>
        <button style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} type="submit" className="ui icon big button">
          <i className="search icon"></i>
        </button>
      </div>
      <div className="profileScreenScrollContainer">
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Link className='profileScreenFollowing' to="/profile/test">
                <img className="profilePicture" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='profileFollowingInfo'>
                  <h1>Steve Jobs</h1>
                  <p>aaaaaaaaaaaaaaa</p>
                </div>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link className='profileScreenFollowing' to="/profile/test">
                <img className="profilePicture" src='https://i.imgur.com/bJK5vsQ.png' alt="" />
                <div className='profileFollowingInfo'>
                  <h1>Beter Zeng</h1>
                  <p>This is one that has a lot of detailed information regarding various things such as length, genre, and maybe something else</p>
                </div>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link className='profileScreenFollowing' to="/profile/test">
                <img className="profilePicture" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='profileFollowingInfo'>
                  <h1>Steve Jobs</h1>
                  <p>aaaaaaaaaaaaaaa</p>
                </div>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link className='profileScreenFollowing' to="/profile/test">
                <img className="profilePicture" src='https://i.imgur.com/bJK5vsQ.png' alt="" />
                <div className='profileFollowingInfo'>
                  <h1>Beter Zeng</h1>
                  <p>bbbbbbbbbbbbbbb</p>
                </div>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link className='profileScreenFollowing' to="/profile/test">
                <img className="profilePicture" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='profileFollowingInfo'>
                  <h1>Steve Jobs</h1>
                  <p>aaaaaaaaaaaaaaa</p>
                </div>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link className='profileScreenFollowing' to="/profile/test">
                <img className="profilePicture" src='https://i.imgur.com/bJK5vsQ.png' alt="" />
                <div className='profileFollowingInfo'>
                  <h1>Beter Zeng</h1>
                  <p>bbbbbbbbbbbbbbb</p>
                </div>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}

export const MyAccount = (props) => {
  const currentUser = jsonData.Users[0];

  return (
    <div className="profileScreenMainContainer">
      <p className="profileScreenSubText">Username</p>
      <div className="ui input profileInputContainer">
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.username}/>
        <p className="profileAccountSubText">change</p>
      </div>
      <p className="profileScreenSubText">Email</p>
      <div className="ui input profileInputContainer">
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.email}/>
        <p className="profileAccountSubText">change</p>
      </div>
      <p className="profileScreenSubText">New Password</p>
      <div className="ui input profileInputContainer">
        <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }} />
        <p className="profileAccountSubText">change</p>
      </div>
      <p className="profileScreenSubText">Confirm New Password</p>
      <div className="ui input profileInputContainer">
        <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }} />
        <p className="profileAccountSubText">change</p>
      </div>
    </div>
  )
}

export const MyPlaylist = (props) => {
  return (
    <div className="playlistsSearchContainer ui input">
      <div className="playlists_container">
        <Grid columns={2} divided>
          <Grid.Row className="playlists_row">
            <Grid.Column>
              <div className='playlists'>
                <img className="playlists_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='playlists'>
                <img className="playliXsts_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}