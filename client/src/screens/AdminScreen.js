import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as styles from '../styles/colorSchemes'
import "../styles/css/index.css"

const AdminScreen = (props) => {
  return (
    <div className="App">
      <div style={{ backgroundColor: "var(--primary)", height: "75px" }}>This is the admin control panel. This should be changed so it is only accessable from admin accounts</div>
      <div style={{ backgroundColor: "var(--secondary)", height: "75px" }}>TEST APIs</div>
      <div style={{ backgroundColor: "var(--tertiary)", height: "75px" }}>Remember to brush your teeth</div>
      <div style={{ backgroundColor: "var(--accent)", height: "75px" }}>And clean behind your ears</div>
      <div style={{ backgroundColor: "var(--background)", height: "75px" }}>When will the SRS be graded? :(</div>
      {props.location.beter && <p>BETER ZENG HAHA</p>}
      <div>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
};

export default AdminScreen;