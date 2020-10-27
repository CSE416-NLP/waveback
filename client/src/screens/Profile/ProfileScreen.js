import React, { useState } from 'react';
import { Modal, Header, Icon, Button, Dropdown } from 'semantic-ui-react';
import "../../styles/css/index.css"
import { COLOR_SCHEMES } from '../../styles/ColorSchemes'
import * as tabComponents from './TabComponents'

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

const tabMap = {
  "Profile": <tabComponents.MyProfile />,
  "Friends": <tabComponents.MyFriends />,
  "Settings": <tabComponents.MyAccount />,
}

const ProfileScreen = (props) => {
  const [currentTab, setCurrentTab] = useState("Profile");
  const [signOutOpenState, setSignOutModalOpenState] = useState(false);

  return (
    <div className="profileScreen" style={{ backgroundColor: "var(--background)" }}>

      <div className="profileScreenOptions" style={{ backgroundColor: "var(--background)" }}>
        <div className="profileScreenLeftContainer" style={{ backgroundColor: "var(--secondary)", filter: "drop-shadow(5px 0px 0px var(--accent))" }}>
          <p className="profileOptionsText" style={{ color: "var(--accent)", fontWeight: currentTab==="Profile" ? "bold" : "normal" }} onClick={(e) => setCurrentTab("Profile")}>My Profile</p>
          <p className="profileOptionsText" style={{ color: "var(--accent)", fontWeight: currentTab==="Friends" ? "bold" : "normal" }} onClick={(e) => setCurrentTab("Friends")}>My Friends</p>
          <p className="profileOptionsText" style={{ color: "var(--accent)", fontWeight: currentTab==="Settings" ? "bold" : "normal" }} onClick={(e) => setCurrentTab("Settings")}>My Account</p>
          <Modal
            basic
            onClose={() => setSignOutModalOpenState(false)}
            onOpen={() => setSignOutModalOpenState(true)}
            open={signOutOpenState}
            size='small' trigger={<div className="profileOptionsButton">
              <button style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="ui massive button">Sign Out</button>
            </div>}>
            <Header icon><Icon name='sign-out' />Sign Out</Header>
            <Modal.Content>
              <div className="signOutText">
                <p>Are you sure you want to sign out?</p>
              </div>
            </Modal.Content>
            <Modal.Actions className="signOutModalButtonContainer">
              <Button inverted color='red' onClick={() => setSignOutModalOpenState(false)}><Icon name='remove' />No</Button>
              <Button className="ui primary button" onClick={() => handleSignOut()}><Icon name='checkmark' />Yes</Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>

      <div className="dropdownChangeTheme">
        <Button.Group>
          <Dropdown style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} text='Theme' icon='theme' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item
                label={{ color: 'teal', empty: true, circular: true }}
                onClick={() => changeStyle(COLOR_SCHEMES["Modern"])}
                text="Modern"
              />
              <Dropdown.Item
                label={{ color: 'orange', empty: true, circular: true }}
                onClick={() => changeStyle(COLOR_SCHEMES["Old-School"])}
                text="Old-School"
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
      {tabMap[currentTab]}
    </div>
  );
};

export default ProfileScreen;