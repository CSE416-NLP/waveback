import React from 'react';
import { COLOR_SCHEMES } from '../styles/ColorSchemes'

import "../styles/css/index.css"

const changeStyle = (style) => {
  document.documentElement.style.setProperty("--primary", style.primary);
  document.documentElement.style.setProperty("--secondary", style.secondary);
  document.documentElement.style.setProperty("--accent", style.accent);
  document.documentElement.style.setProperty("--background", style.background);
  document.documentElement.style.setProperty("--hue", style.hue);
  document.documentElement.style.setProperty("--buttonColor", style.buttonColor);
}

const AdminScreen = (props) => {
  
  const searchSpotify = (term) => { // Default is all fields, playlist generation may only use song search
    // if (term === "") return;
    let token = getSpotifyAccessToken();
    token = "Bearer " + token;
    // let query = "https://api.spotify.com/v1/search?q=" + term + "&type=track%2Cartist%2Calbum&market=US"
    // let query = "https://api.spotify.com/v1/browse/categories/rap/playlists?country=US&limit=10"
    let query = "https://api.spotify.com/v1/browse/categories"
    fetch(query, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSearchResult(data.tracks.items)
        })
}

  return (
    <div style={{ height: "100%", textAlign: "center" }}>
      <button onClick={searchSpotify}>spotify test</button> 

      <select onChange={(e) => {
        changeStyle(COLOR_SCHEMES[e.target.value])
      }}>
        <option value={"Modern"}>Modern</option>
        <option value={"Old-School"}>Old-School</option>
        <option value={"Retro"}>Retro</option>

      </select>
      <div style={{ backgroundColor: "var(--primary)", height: "20%" }}>This is the admin control panel. This should be changed so it is only accessable from admin accounts {props.location.beter && <p>BETER ZENG HAHA</p>}</div>
      <div style={{ backgroundColor: "var(--secondary)", height: "20%" }}>TEST APIs</div>
      <div style={{ backgroundColor: "var(--tertiary)", height: "20%" }}>Remember to brush your ears</div>
      <div style={{ backgroundColor: "var(--accent)", height: "20%" }}>And clean behind your teeth</div>
      <div style={{ backgroundColor: "var(--background)", height: "20%" }}>When will the SRS be graded? :(</div>
    </div>
  );
};

export default AdminScreen;