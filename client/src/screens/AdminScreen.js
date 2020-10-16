import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as styles from '../styles/colorSchemes'
import "../styles/css/index.css"

const AdminScreen = (props) => {
  return (
    <div style={{ height: "100%", textAlign: "center"}}>
      <div style={{ backgroundColor: "var(--primary)", height: "15%"}}>This is the admin control panel. This should be changed so it is only accessable from admin accounts</div>
      <div style={{ backgroundColor: "var(--secondary)", height: "15%" }}>TEST APIs</div>
      <div style={{ backgroundColor: "var(--tertiary)", height: "15%" }}>Remember to brush your teeth</div>
      <div style={{ backgroundColor: "var(--accent)", height: "15%" }}>And clean behind your ears</div>
      <div style={{ backgroundColor: "var(--background)", height: "15%" }}>When will the SRS be graded? :(</div>
      {props.location.beter && <p>BETER ZENG HAHA</p>}
      <div>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
};

export default AdminScreen;