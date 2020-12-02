import React, { useState } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { getSongTime } from "../UtilityComponents/Playlist";
import "../styles/css/index.css";

// Widget that displays all public users.
const UserSearch = (props) => {
    let searchResults = props.searchResults;

    return (
        <div className="displaySearchResultsContainer2">
        <div className="displaySearchResultsContainer">
            {
                searchResults.map((song, index) => (
                    <div className="playlistSearchResultBox" key={index}>
                        <div className="playlistSearchResult">
                            <div className="playlistSongSearchResultImage">
                                <img className="searchResultImg" src={song.album.images[0].url} alt="" />
                            </div>
                            <div className="playlistSongSearchResultInfo">
                                <div className="playlistSongSearchResultTitle">{song.name}</div>
                                <div className="playlistSongSearchResultDesc">{song.artists[0].name}</div>
                            </div>
                        </div>
                        <div className="playlistSearchResultOptions">
                            <Modal
                                onClose={() => setSongInfoOpenState(false)}
                                onOpen={() => setSongInfoOpenState(song)}
                                open={Boolean(songInfoOpenState)}
                                size='small'
                                trigger={
                                    <button className="searchResultOptionButton clickButton ui icon button" >
                                        <Icon className="info circle"></Icon>
                                    </button>}>
                                <Header icon>Song Info</Header>
                                <Modal.Content>
                                    <div className="moreInfoContainer">
                                        <img className="playlistSRRArt" src={songInfoOpenState ? songInfoOpenState.album.images[0].url : ""} alt="" />
                                        <div>
                                            <div className="playlistSRRTitle">{songInfoOpenState ? songInfoOpenState.name : ""}</div>
                                            <div className="playlistSRRArtist">{songInfoOpenState ? songInfoOpenState.artists[0].name : ""}</div>
                                            <div className="playlistSRRAlbum">{
                                                songInfoOpenState ? songInfoOpenState.album.name + ", " + songInfoOpenState.album.release_date.substring(0, 4) : ""
                                            }</div>
                                            <br></br>
                                            <div className="playlistSRRDuration">{
                                                songInfoOpenState ? "Duration: " + getSongTime(Math.round(songInfoOpenState.duration_ms / 1000)) : ""
                                            }</div>
                                        </div>
                                    </div>
                                </Modal.Content>
                                <Modal.Actions className="recoverPasswordModalButtonContainer">
                                    <Button inverted color='red' onClick={(e) => setSongInfoOpenState(false)}><Icon name='close' />Close</Button>
                                </Modal.Actions>
                            </Modal>
                            <button className="searchResultOptionButton clickButton ui icon button" onClick={() => playSongByURI(song.uri)} >
                                <Icon className="play circle"></Icon>
                            </button>
                            <button className="searchResultOptionButton clickButton ui icon button" onClick={() => addSong(song)} >
                                <Icon className="plus circle"></Icon>
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    )
}
export default UserSearch;