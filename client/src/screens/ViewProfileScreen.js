import React, { useState } from 'react';
import { Modal, Form, Header, Icon, TextArea, Grid, Button, Dropdown } from 'semantic-ui-react';
import "../styles/css/index.css"
import { COLOR_SCHEMES } from '../styles/ColorSchemes'

const changeStyle = (style) => {
    document.documentElement.style.setProperty("--primary", style.primary);
    document.documentElement.style.setProperty("--secondary", style.secondary);
    document.documentElement.style.setProperty("--accent", style.accent);
    document.documentElement.style.setProperty("--background", style.background);
    document.documentElement.style.setProperty("--hue", style.hue);
    document.documentElement.style.setProperty("--buttonColor", style.buttonColor);
}

const ViewProfileScreen = (props) => {
    return (
        <div className="viewProfileScreenContainer">
            <div className="profileContainer">
                <img className="profilePicture" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                <div className="profileName"><h1>Epic Man</h1></div>
            </div>
            <p className="viewProfileScreenLabel">Bio</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>I WAS BORN IN THE WRONG GENERATION I ONLY LISTEN TO REAL MUSIC</div>
            <p className="viewProfileScreenLabel">Location</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>New York, New York</div>
            <p className="viewProfileScreenLabel">Favorite Genres</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>RIGHT GENERATION MUSIC</div>
            <p className="viewProfileScreenLabel">Favorite Artists</p>
            <div className="profileTextArea" style={{ backgroundColor: "var(--secondary)" }}>TWENTY PILOTS</div>
            <p className="viewProfileScreenLabel">My Playlists:</p>
            <Grid columns={3} divded>
                <Grid.Row className="playlist_row">
                    <Grid.Column>
                        <div className='playlist'>
                            <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                            <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='playlist'>
                            <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                            <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='playlist'>
                            <img className="playlist_art" src='https://cdn.discordapp.com/attachments/692102395651686481/768629768924954644/Z.png' alt="" />
                            <div className='info'><h1>Jihu's Pee Pee</h1><p>Jihu's Pee Pee is really big</p></div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>


    );
};

export default ViewProfileScreen;