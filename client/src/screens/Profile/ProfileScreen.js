import React, { useState } from 'react';
import { Modal, Header, Icon, Button } from 'semantic-ui-react';
import "../../styles/css/index.css"
import * as tabComponents from './TabComponents'
import ThemePicker from "../../UtilityComponents/ThemePicker"
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { LOGOUT } from '../../cache/mutations';
import { Redirect } from 'react-router-dom';

const tabMap = {
  "Profile": <tabComponents.MyProfile />,
  "Following": <tabComponents.Following />,
  "Settings": <tabComponents.MyAccount />,
}

const ProfileScreen = (props) => {
  const [currentTab, setCurrentTab] = useState("Profile");
  const [signOutOpenState, setSignOutModalOpenState] = useState(false);

  const logout = async (e) => {
    const logoutResult = await props.logout();
    if (logoutResult.data.logout) {
      const { data } = await props.fetchUser();
      if (data && data.getCurrentUser === null) {
        return <Redirect to="/welcome" />
      }
    }
  };

  return (
    <div className="profileScreen" style={{ backgroundColor: "var(--background)" }}>

      <div className="profileScreenOptions" style={{ backgroundColor: "var(--background)" }}>
        <div className="profileScreenLeftContainer" style={{ backgroundColor: "var(--secondary)" }}>
          <p className="profileOptionsText" style={{ color: "var(--accent)", fontWeight: currentTab === "Profile" ? "bold" : "normal" }} onClick={(e) => setCurrentTab("Profile")}>My Profile</p>
          <p className="profileOptionsText" style={{ color: "var(--accent)", fontWeight: currentTab === "Following" ? "bold" : "normal" }} onClick={(e) => setCurrentTab("Following")}>Following</p>
          <p className="profileOptionsText" style={{ color: "var(--accent)", fontWeight: currentTab === "Settings" ? "bold" : "normal" }} onClick={(e) => setCurrentTab("Settings")}>My Account</p>
          <Modal basic size='small' open={signOutOpenState} trigger={<div className="profileOptionsButton"
            onClose={() => setSignOutModalOpenState(false)} onOpen={() => setSignOutModalOpenState(true)}
          >
            <button style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="ui massive button">Sign Out</button>
          </div>}>
            <Header icon><Icon name='sign-out'/>Sign Out</Header>
            <Modal.Content>
              <div className="signOutText">
                <p>Are you sure you want to sign out?</p>
              </div>
            </Modal.Content>
            <Modal.Actions className="signOutModalButtonContainer">
              <Button inverted color='red' onClick={() => setSignOutModalOpenState(false)}><Icon name='remove' />No</Button>
              <Button className="ui primary button" onClick={logout}><Icon name='checkmark' />Yes</Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>

      <ThemePicker />

      {tabMap[currentTab]}
    </div>
  );
};

export default compose
  (graphql(LOGOUT, { name: 'logout' }))
  (ProfileScreen);
