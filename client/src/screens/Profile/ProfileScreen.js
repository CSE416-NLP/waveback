import React, { useState } from 'react';
import { Modal, Header, Icon, Button } from 'semantic-ui-react';
import "../../styles/css/index.css"
import * as tabComponents from './TabComponents'
import ThemePicker from "../../UtilityComponents/ThemePicker"

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

      <ThemePicker />

      {tabMap[currentTab]}
    </div>
  );
};

export default ProfileScreen;