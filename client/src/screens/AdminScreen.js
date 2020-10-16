import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as styles from '../styles/colorSchemes'
import "../styles/css/index.css"

const AdminScreen = (props) => {
  return (
    <div style={{ height: "100%", textAlign: "center"}}>
      <div style={{ backgroundColor: "var(--primary)", height: "20%"}}>This is the admin control panel. This should be changed so it is only accessable from admin accounts {props.location.beter && <p>BETER ZENG HAHA</p>}</div>
      <div style={{ backgroundColor: "var(--secondary)", height: "20%" }}>TEST APIs</div>
      <div style={{ backgroundColor: "var(--tertiary)", height: "20%" }}>Remember to brush your teeth</div>
      <div style={{ backgroundColor: "var(--accent)", height: "20%" }}>And clean behind your ears</div>
      <div style={{ backgroundColor: "var(--background)", height: "20%" }}>When will the SRS be graded? :(</div>
    </div>
  );
};

export default AdminScreen;