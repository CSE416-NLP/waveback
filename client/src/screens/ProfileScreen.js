import React, { useState } from 'react';
import { Modal, Form, Header, Icon, TextArea, Grid, Button, Dropdown } from 'semantic-ui-react';
import "../styles/css/index.css"
import { COLOR_SCHEMES } from '../styles/colorSchemes'

var previousClickedTabName = undefined;

const changeStyle = (style) => {
  document.documentElement.style.setProperty("--primary", style.primary);
  document.documentElement.style.setProperty("--secondary", style.secondary);
  document.documentElement.style.setProperty("--accent", style.accent);
  document.documentElement.style.setProperty("--background", style.background);
  document.documentElement.style.setProperty("--hue", style.hue);
  document.documentElement.style.setProperty("--buttonColor", style.buttonColor);
}

const handleSignOut = () => {
  console.log("sign out");
}

const ProfileScreen = (props) => {
  const [currentTab, setCurrentTab] = useState("profile");
  const [signOutOpenState, setSignOutModalOpenState] = useState(false);
  
  const setSelectedTab = (clickedTabName, tab) => {
    // Highlight selected tab's text and deselect the others.
    clickedTabName.style.fontWeight = "bold";
    console.log(clickedTabName);
    if (previousClickedTabName !== undefined) { previousClickedTabName.style.fontWeight = "normal"; }
    previousClickedTabName = clickedTabName;
    // Set state of the currently selected tab.
    let currentTabCopy = [...currentTab];
    currentTabCopy = tab;
    setCurrentTab(currentTabCopy);
  }

  let tabComponent;
  if (currentTab === "profile") {
    tabComponent = <div className="profileScreenMainContainer">
                    <p className="profileScreenSubText">Bio</p>
                    <Form><TextArea className="profileTextArea" rows={6} style={{backgroundColor: "var(--secondary)"}} placeholder="Tell us about yourself" /></Form>
                    <p className="profileScreenSubText">Location</p>
                    <Form><TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} placeholder="Where do you call home?" /></Form>
                    <p className="profileScreenSubText">Favorite Genres</p>
                    <Form><TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} /></Form>
                    <p className="profileScreenSubText">Favorite Artists</p>
                    <Form><TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} /></Form>
                  </div>;
  }
  else if (currentTab === "friends") {
    tabComponent = 
    <div className="profileScreenMainContainerFriends">
      <div className="friendSearchContainer ui input">
        <input placeholder="Search for a friend..." style={{backgroundColor: "var(--secondary)"}} size="50" className="discoverSearch"></input>
        <button type="submit" className="ui icon black big button"><i className="search icon"></i></button>
      </div>
      <div className="profileScreenScrollContainer">
        <Grid columns={2} divded>
          <Grid.Row>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>Steve Jobs</h1>
                  <p>aaaaaaaaaaaaaaa</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://i.imgur.com/bJK5vsQ.png' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>Beter Zeng</h1>
                  <p>bbbbbbbbbbbbbbb</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://i.imgur.com/bJK5vsQ.png' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>Paul Fodor</h1>
                  <p>snip</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://i.imgur.com/GUxXLET.jpg' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>The Mckilla Gorilla</h1>
                  <p>imagine grading the SRS LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>Saransh</h1>
                  <p>is an alcoholic</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://i.imgur.com/bJK5vsQ.png' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>wahoo</h1>
                  <p>imma luigi numbah one</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://i.imgur.com/GUxXLET.jpg' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>aaaaaaffffffffffffffffffffffffffffffeeeeeeeeeeeeff</h1>
                  <p>aaaaaaaaaaaa</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='profileScreenFriend'>
                <img className="playlist_art" src='https://cdn.discordapp.com/attachments/689243098488111383/769750957985890324/Capture.PNG' alt=""/>
                <div className='profileFriendInfo'>
                  <h1>robbie economou</h1>
                  <p>(914) 217 7980 - call for a sexy time</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  }
  else {
    tabComponent = <div className="profileScreenMainContainer">
                    <p className="profileScreenSubText">Username</p>
                    <div className="ui input profileInputContainer">
                      <input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                    <p className="profileScreenSubText">Email</p>
                    <div className="ui input profileInputContainer">
                      <input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                    <p className="profileScreenSubText">New Password</p>
                    <div className="ui input profileInputContainer">
                      <input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                    <p className="profileScreenSubText">Confirm New Password</p>
                    <div className="ui input profileInputContainer">
                      <input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                  </div>
  }

  return (
    <div className="profileScreen" style={{backgroundColor: "var(--background)"}}>

      <div className="profileScreenOptions" style={{backgroundColor: "var(--background)"}}>
        <div className="profileScreenLeftContainer" style={{backgroundColor: "var(--secondary)", filter: "drop-shadow(5px 0px 0px var(--accent))"}}>
          <p className="profileOptionsText" style={{color: "var(--accent)", fontWeight: "bold"}} onClick={(e) => setSelectedTab(e.target, "profile")}>My Profile</p>
          <p className="profileOptionsText" style={{color: "var(--accent)"}} onClick={(e) => setSelectedTab(e.target, "friends")}>My Friends</p>
          <p className="profileOptionsText" style={{color: "var(--accent)"}} onClick={(e) => setSelectedTab(e.target, "settings")}>My Account</p>
          <Modal 
            basic 
            onClose={() => setSignOutModalOpenState(false)}
            onOpen={() => setSignOutModalOpenState(true)}
            open={signOutOpenState}
            size='small' trigger={<a className="profileOptionsButton"><button className="ui black massive button">Sign Out</button></a>}>
            <Header icon><Icon name='sign-out' />Sign Out</Header>
            <Modal.Content>
                <div className="signOutText">
                    <p>Are you sure you want to sign out?</p>
                </div>
            </Modal.Content>
            <Modal.Actions className="signOutModalButtonContainer">
                <Button inverted color='red' onClick={() => setSignOutModalOpenState(false)}><Icon name='remove'/>No</Button>
                <Button color='primary' onClick={() => handleSignOut()}><Icon name='checkmark'/>Yes</Button>
            </Modal.Actions>
        </Modal>
          </div>
      </div>

      <div className="dropdownChangeTheme">
                    <Button.Group color="black">
                        <Dropdown text='Theme' icon='theme' floating labeled button className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    label={{ color: 'teal', empty: true, circular: true }}
                                    onClick={() => changeStyle(COLOR_SCHEMES["Default"])}
                                    text="Default"
                                />
                                <Dropdown.Item
                                    label={{ color: 'orange', empty: true, circular: true }}
                                    onClick={() => changeStyle(COLOR_SCHEMES["Vintage"])}
                                    text="Vintage"
                                />
                                <Dropdown.Item
                                    label={{ color: 'purple', empty: true, circular: true }}
                                    onClick={() => changeStyle(COLOR_SCHEMES["Retro"])}
                                    text="Retro"
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>
                </div>
      {tabComponent}
    </div>
  );
};

export default ProfileScreen;