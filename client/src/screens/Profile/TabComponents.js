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
        <TextArea className="profileTextArea" rows={6} style={{ backgroundColor: "var(--secondary)" }} placeholder="Tell us about yourself" defaultValue={currentUser.bio} />
      </Form>
      <p className="profileScreenSubText">Location</p>
      <Form>
        <TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} placeholder="Where do you call home?" defaultValue={currentUser.location} />
      </Form>
      <p className="profileScreenSubText">Favorite Genres</p>
      <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.favorite_genres} /></Form>
      <p className="profileScreenSubText">Favorite Artists</p>
      <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.favorite_artists} /></Form>
      <p className="profileScreenSubText">Favorite Songs</p>
      <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.favorite_songs} /></Form>
    </div>
  )
}

export const Following = (props) => {
  const users = jsonData.Users;
  const columns = 2;
  console.log(users);
  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
        <input placeholder="Search for a user..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"></input>
        <button style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} type="submit" className="ui icon big button">
          <i className="search icon"></i>
        </button>
      </div>
      <div className="profileScreenScrollContainer">
        <Grid columns={columns} divided>
          {users.map((user, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              <Link className="profileScreenFollowing" to={{ pathname: "/profile/" + user._id, user: user }}>

                <img className="profilePicture" src={user.profile_picture} alt="" />
                <div className='profileFollowingInfo'>
                  <h2>{user.username}</h2>
                </div>
              </Link>
            </Grid.Column>
          ))}
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
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.username} />
        <p className="profileAccountSubText">change</p>
      </div>
      <p className="profileScreenSubText">Email</p>
      <div className="ui input profileInputContainer">
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.email} />
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