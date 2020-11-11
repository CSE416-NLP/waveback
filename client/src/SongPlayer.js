import React, { Component } from 'react';
import SpotifyPlayerContainer from "./SpotifyPlayerContainer";

const SongPlayer = (props) => {
    let songURI = "";
    if (props) {
        console.log(props);
        songURI = props.location.songURI;
    }
        // let songURI = this.props.songURI;
    return (<SpotifyPlayerContainer playingRecordingID = {songURI}/>);
}

export default SongPlayer;