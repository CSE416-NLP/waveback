import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as styles from '../styles/colorSchemes'
import "../styles/css/index.css"

const AdminScreen = (props) => {
  const changeStyle = (style) => {
    document.documentElement.style.setProperty("--primary", style.primary);
    document.documentElement.style.setProperty("--secondary", style.secondary);
    document.documentElement.style.setProperty("--tertiary", style.tertiary);
    document.documentElement.style.setProperty("--accent", style.accent);
    document.documentElement.style.setProperty("--background", style.background);
  }

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
      <button onClick={() => changeStyle(styles.COLOR_SCHEME_1950S)}>1950s Color theme</button>
      <button onClick={() => changeStyle(styles.COLOR_SCHEME_1960S)}>1960s Color theme</button>
      <button onClick={() => changeStyle(styles.COLOR_SCHEME_1970S)}>1970s Color theme</button>
      <button onClick={() => changeStyle(styles.COLOR_SCHEME_1980S)}>1980s Color theme</button>
      <button onClick={() => changeStyle(styles.COLOR_SCHEME_1990S)}>1990s Color theme</button>
      <button onClick={() => changeStyle(styles.COLOR_SCHEME_2000S)}>2000s Color theme</button>
      <button onClick={() => changeStyle(styles.COLOR_SCHEME_2010S)}>2010s Color theme</button>
    </div>
  );
};

export default AdminScreen;