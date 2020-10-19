import React from 'react';
import { COLOR_SCHEMES } from '../styles/colorSchemes'

import "../styles/css/index.css"

const changeStyle = (style) => {
  document.documentElement.style.setProperty("--primary", style.primary);
  document.documentElement.style.setProperty("--secondary", style.secondary);
  document.documentElement.style.setProperty("--tertiary", style.tertiary);
  document.documentElement.style.setProperty("--accent", style.accent);
  document.documentElement.style.setProperty("--background", style.background);
}

const AdminScreen = (props) => {
  return (
    <div style={{ height: "100%", textAlign: "center"}}>

      <select onChange={(e) => {
        changeStyle(COLOR_SCHEMES[e.target.value])
      }}>
        <option value={"1950s"}>1950s</option>
        <option value={"1960s"}>1960s</option>
        <option value={"1970s"}>1970s</option>
        <option value={"1980s"}>1980s</option>
        <option value={"1990s"}>1990s</option>
        <option value={"2000s"}>2000s</option>
        <option value={"2010s"}>2010s</option>
      </select>

      <div style={{ backgroundColor: "var(--primary)", height: "20%"}}>This is the admin control panel. This should be changed so it is only accessable from admin accounts {props.location.beter && <p>BETER ZENG HAHA</p>}</div>
      <div style={{ backgroundColor: "var(--secondary)", height: "20%" }}>TEST APIs</div>
      <div style={{ backgroundColor: "var(--tertiary)", height: "20%" }}>Remember to brush your ears</div>
      <div style={{ backgroundColor: "var(--accent)", height: "20%" }}>And clean behind your teeth</div>
      <div style={{ backgroundColor: "var(--background)", height: "20%" }}>When will the SRS be graded? :(</div>
    </div>
  );
};

export default AdminScreen;