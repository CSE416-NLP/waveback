import React, { useState } from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react'
import "../styles/css/index.css"

var previousClickedText = undefined;

const ProfileScreen = (props) => {
  const [currentTab, setCurrentTab] = useState("profile");
  
  const setSelectedTab = (clickedText, tab) => {
    // Highlight selected tab's text and deselect the others.
    clickedText.style.fontWeight = "bold";
    if (previousClickedText != undefined) { previousClickedText.style.fontWeight = "normal"; }
    previousClickedText = clickedText;
    // Set state of the currently selected tab.
    let currentTabCopy = [...currentTab];
    currentTabCopy = tab;
    setCurrentTab(currentTabCopy);
  }

  let tabComponent;
  if (currentTab == "profile") {
    tabComponent = <div className="profileScreenMainContainer">
                    <p className="profileScreenSubText">Bio</p>
                    <Form><TextArea className="profileTextArea" rows={6} style={{backgroundColor: "var(--secondary)"}} placeholder="Tell us about yourself" /></Form>
                    <p className="profileScreenSubText">Location</p>
                    <Form><TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} placeholder="Where do you call home?" /></Form>
                    <p className="profileScreenSubText">Favorite Genres</p>
                    <Form><TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} placeholder="enter fav genres" /></Form>
                    <p className="profileScreenSubText">Favorite Artists</p>
                    <Form><TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} placeholder="enter fav artists" /></Form>
                    <div className="profileScreenSubText"><button className="ui teal button massive">Submit</button></div>
                  </div>;
  }
  else if (currentTab == "friends") {
    tabComponent = undefined;
  }
  else {
    tabComponent = <div className="profileScreenMainContainer">
                    <p className="profileScreenSubText">Username</p>
                    <div className="profileInputContainer">
                      <Input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                    <p className="profileScreenSubText">Email</p>
                    <div className="profileInputContainer">
                      <Input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                    <p className="profileScreenSubText">New Password</p>
                    <div className="profileInputContainer">
                      <Input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                    <p className="profileScreenSubText">Confirm New Password</p>
                    <div className="profileInputContainer">
                      <Input className="profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
                    </div>
                  </div>
  }

  return (
    <div className="profileScreen" style={{backgroundColor: "var(--background)"}}>

      <div className="profileScreenOptions" style={{backgroundColor: "var(--background)"}}>
        <div className="profileScreenLeftContainer" style={{backgroundColor: "var(--secondary)", filter: "drop-shadow(5px 0px 0px var(--accent))"}}>
          <p className="profileOptionsText" style={{color: "var(--accent)"}} onClick={(e) => setSelectedTab(e.target, "profile")}>My Profile</p>
          <p className="profileOptionsText" style={{color: "var(--accent)"}} onClick={(e) => setSelectedTab(e.target, "friends")}>My Friends</p>
          <p className="profileOptionsText" style={{color: "var(--accent)"}} onClick={(e) => setSelectedTab(e.target, "settings")}>My Account</p>
          <a className="profileOptionsButton"><button className="ui black massive button">Sign Out</button></a>
          </div>
      </div>

      {/* TODO: Add switching inbetween tabs that also turns on and off the HTML for each tab. */}

      {tabComponent}

    </div>
  );
};

export default ProfileScreen;