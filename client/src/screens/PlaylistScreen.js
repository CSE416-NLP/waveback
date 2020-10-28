import React from 'react';
import { Grid } from 'semantic-ui-react';
import "../styles/css/index.css"

const PlaylistScreen = (props) => {
    console.log(props)
    if (props.history.location.playlist) {
        console.log(props.history.location.playlist)
    }
    return (
        <div className="playlistScreen" style={{ backgroundColor: "var(--background)" }}>
            <div className="playlistScreenLeftContainer" style={{ backgroundColor: "var(--secondary)", filter: "drop-shadow(5px 0px 0px var(--accent))" }}>

            </div>
        </div>
    );
};

export default PlaylistScreen;