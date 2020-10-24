import React from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react'
import "../styles/css/index.css"

const ProfileScreen = (props) => {
  return (
    <div className="profileScreen" style={{backgroundColor: "var(--background)"}}>

      <div className="profileScreenOptions" style={{backgroundColor: "var(--background)"}}>
        <div className="profileScreenLeftContainer" style={{backgroundColor: "var(--primary)"}}>
          <p className="profileOptionsText" style={{color: "var(--accent)"}}>My Profile</p>
          <p className="profileOptionsText" style={{color: "var(--accent)"}}>My Friends</p>
          <p className="profileOptionsText" style={{color: "var(--accent)"}}>My Account</p>
          <a className="profileOptionsButton"><button className="ui black massive button">Sign Out</button></a>
          </div>
      </div>

      {/* TODO: Add switching inbetween tabs that also turns on and off the HTML for each tab. */}

      <div className="profileScreenMainContainer">
        <p className="profileScreenSubText">Bio</p>
        <Form>
          <TextArea className="profileTextArea" rows={6} style={{backgroundColor: "var(--secondary)"}} placeholder="Tell us about yourself" />
        </Form>
        <p className="profileScreenSubText">Location</p>
        <Form>
          <TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} placeholder="Where do you call home?" />
        </Form>
        <p className="profileScreenSubText">Favorite Genres</p>
        <Form>
          <TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} placeholder="enter fav genres" />
        </Form>
        <p className="profileScreenSubText">Favorite Artists</p>
        <Form>
          <TextArea className="profileTextArea" rows={1} style={{backgroundColor: "var(--secondary)"}} placeholder="enter fav artists" />
        </Form>
        <div className="profileScreenSubText"><button className="ui teal button massive">Submit</button></div>
      </div>

      {/* Profile Screen Friends Container would go here. */}

      <div className="profileScreenMainContainer" style={{display: "none"}}>
        <p className="profileScreenSubText">Username</p>
        <div className="profileInputContainer">
          <Input className="disabled profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
        </div>
        <p className="profileScreenSubText">Email</p>
        <div className="profileInputContainer">
          <Input className="disabled profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
        </div>
        <p className="profileScreenSubText">New Password</p>
        <div className="profileInputContainer">
          <Input className="disabled profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
        </div>
        <p className="profileScreenSubText">Confirm New Password</p>
        <div className="profileInputContainer">
          <Input className="disabled profileInput" style={{backgroundColor: "var(--secondary)"}}/><p className="profileAccountSubText">change</p>
        </div>

      </div>

    </div>
  );
};

export default ProfileScreen;