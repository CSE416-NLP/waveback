import React, { useState } from 'react';
import { Modal, Icon, Header, Button, Popup } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getSpotifyAccessToken } from "../data/LocalStorage.js";
import { useQuery } from '@apollo/react-hooks';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import "../styles/css/index.css"
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose, random } from 'lodash';
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from '../cache/mutations';
import { getSongTime, getAlbumTime } from "../UtilityComponents/Playlist";
const ObjectId = require("mongoose").Types.ObjectId;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const PlaylistScreen = (props) => {
    const { data, refetch } = useQuery(GET_DB_PLAYLISTS);

    const playlist = props.location.playlist;

    const [playlistName, setPlaylistName] = useState(playlist.name);
    const [playlistDescription, setPlaylistDescription] = useState(playlist.description);
    const [playlistPicture, setPlaylistPicture] = useState(playlist.picture ? playlist.picture : "https://i.imgur.com/ZRoNOEu.png");
    const [playlistPictureOpenState, setPlaylistPictureOpenState] = useState(false);
    const [deletePlaylistOpenState, setDeletePlaylistOpenState] = useState(false);
    const [songInfoOpenState, setSongInfoOpenState] = useState(false);
    const [playlistSongs, setPlaylistSongs] = useState(playlist.songs);
    const [playlistSongURIs, setPlaylistSongURIs] = useState(playlist.songURIs);
    const [sortState, setSortState] = useState("normal");
    // Spotify Song Searching
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResult] = useState([]);

    const handleUpdatePlaylist = async () => {
        setPlaylistPictureOpenState(false);
        let songsCopy = [...playlistSongs];
        for (let i = 0; i < songsCopy.length; i++) {
            if (!songsCopy[i]._id) songsCopy[i]._id = ObjectId();
            delete songsCopy[i].__typename;
        }
        const { data } = await props.updatePlaylist({
            variables: {
                _id: playlist._id,
                name: playlistName,
                picture: playlistPicture,
                description: playlistDescription,
                songs: songsCopy,
                songURIs: playlistSongURIs,
                duration: parseInt(getAlbumTime(playlistSongs)),
                tags: playlist.tags
            }
        })
        if (data && data.updatePlaylist) console.log("Updated successfully");
        else console.log("Error in updating");
        // props.fetchUser();
    }

    const deletePlaylist = async () => {
        setDeletePlaylistOpenState(false);
        props.deletePlaylist({ variables: { _id: playlist._id } });
        props.history.push({ pathname: '/playlists' });
        refetch();
    }

    const searchSpotify = (term) => { // Default is all fields, playlist generation may only use song search
        if (term === "") return;
        let token = getSpotifyAccessToken();
        token = "Bearer " + token;
        let query = "https://api.spotify.com/v1/search?q=" + term + "&type=track%2Cartist%2Calbum&market=US"

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
                setSearchResult(data.tracks.items)
            })
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
        if (event.key === 'Enter') {
            searchSpotify(event.target.value);
        }
    }

    const getRandomSong = () => {
        let randomString = "";
        for (let i = 0; i < 3; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setSearchTerm(randomString);
        searchSpotify(randomString);
    }

    const updateTracks = (newURIs, offset) => {
        if (props.currentPlaylistID === playlist._id) {
            // Very sloppy solution of mine to reset the player, try to find a better solution
            props.setTracks({
                offset: 0,
                uris: []
            })
            props.setTracks({
                offset: offset,
                uris: newURIs
            })
        }
    }

    const checkPlayerStatus = () => {
        if (props.playStatus !== true) {
            props.setPlayStatus(true);
        }
        if (props.playerVisible === null) {
            props.setPlayerVisible(true);
        }
        if (props.currentPlaylistID === playlist._id) {
            props.setCurrentPlaylistID(playlist._id);
        }
    }

    const addSong = (song) => {
        console.log(song);
        let newSong = {
            _id: "",
            songURI: song.uri,
            key: playlistSongs.length,
            title: song.name,
            artist: song.artists[0].name,
            album: song.album.name,
            genre: [],
            year: parseInt(song.album.release_date.substring(0, 4)),
            duration: Math.round(song.duration_ms / 1000),
            __typename: "Song",
        }
        let newSongURI = song.uri;
        let newSongs = [...playlistSongs];
        newSongs.push(newSong);
        let newSongURIs = [...playlistSongURIs];
        newSongURIs.push(newSongURI);
        setPlaylistSongs(newSongs);
        setPlaylistSongURIs(newSongURIs);
        updateTracks(newSongURIs, props.currentSongIndex);
    }

    const removeSong = (song) => {
        let songs = [...playlistSongs];
        let URIs = [...playlistSongURIs];
        console.log(songs);
        songs.splice(playlistSongs.indexOf(song), 1);
        console.log(songs);
        URIs.splice(playlistSongURIs.indexOf(song.songURI), 1);
        console.log(URIs);
        setPlaylistSongs(songs);
        setPlaylistSongURIs(URIs);
        updateTracks(URIs, props.currentSongIndex);
    }

    const playSong = (offset) => {
        checkPlayerStatus();
        props.setPlayStatus(false);
        props.setTracks({
            offset: offset,
            uris: playlistSongURIs
        })
        props.setPlayStatus(true);
    }

    const playSongByURI = (uri) => {
        checkPlayerStatus();
        props.setPlayStatus(false);
        props.setTracks({
            offset: 0,
            uris: [uri]
        })
        props.setPlayStatus(true);
        console.log(uri);
    }

    const playRandom = () => {
        checkPlayerStatus();
        let random = Math.floor(Math.random() * playlistSongs.length);
        props.setPlayStatus(false);
        props.setTracks({
            offset: random,
            uris: playlistSongURIs,
        })
        props.setPlayStatus(true);
    }

    const sortSongs = (newType) => {
        let songs = [...playlistSongs];
        let sort = sortState;
        let currentURI = playlistSongURIs[props.currentSongIndex];
        if (newType === 0) {
            if (sort === "reverse") {
                setSortState("normal");
                songs.sort(function (a, b) { return a.title.localeCompare(b.title); });
            }
            else if (sort === "normal") {
                setSortState("reverse");
                songs.sort(function (a, b) { return b.title.localeCompare(a.title); });
            }
        }
        else if (newType === 1) {
            if (sort === "reverse") {
                setSortState("normal");
                songs.sort(function (a, b) { return a.artist.localeCompare(b.artist); });
            }
            else if (sort === "normal") {
                setSortState("reverse");
                songs.sort(function (a, b) { return b.artist.localeCompare(a.artist); });
            }
        }
        else {
            if (sort === "reverse") {
                setSortState("normal");
                songs.sort(function (a, b) { return a.duration - b.duration; });
            }
            else if (sort === "normal") {
                setSortState("reverse");
                songs.sort(function (a, b) { return b.duration - a.duration; });
            }
        }
        setPlaylistSongs(songs);

        let newSongURIs = [];
        for (let i = 0; i < songs.length; i++) {
            newSongURIs.push(songs[i].songURI);
        }
        let newCurrentSongPos = newSongURIs.indexOf(currentURI)
        setPlaylistSongURIs(newSongURIs);
        updateTracks(newSongURIs, newCurrentSongPos);
        props.setCurrentSongIndex(newCurrentSongPos)
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let songsCopy = [...playlistSongs];
        let [removed] = songsCopy.splice(result.source.index, 1);
        songsCopy.splice(result.destination.index, 0, removed);
        setPlaylistSongs(songsCopy);

        let songURIsCopy = [...playlistSongURIs];
        let [removedURI] = songURIsCopy.splice(result.source.index, 1);
        songURIsCopy.splice(result.destination.index, 0, removedURI);

        setPlaylistSongURIs(songURIsCopy);
        updateTracks(songURIsCopy, props.currentSongIndex)
    }

    let duration = 0;
    for (let i = 0; i < playlistSongs.length; i++) { duration += playlistSongs[i].duration; }

    return (
        <div className="playlistScreen" style={{ backgroundColor: "var(--background)" }}>

            <div className="playlistScreenLeftBox" style={{ backgroundColor: "var(--background)" }}>
                <div className="playlistScreenLeftContainer">
                    <div className="playlistScreenInfo">
                        <Modal
                            basic
                            onClose={() => setPlaylistPictureOpenState(false)}
                            onOpen={() => setPlaylistPictureOpenState(true)}
                            open={playlistPictureOpenState}
                            size='small'
                            trigger={<img className="playlistArt" src={playlistPicture} alt="" />}>
                            <Header icon><Icon name='user circle' />Update Playlist Picture</Header>
                            <Modal.Content>
                                <div className="ui input changeAvatarTextField">
                                    <input size="50" onChange={(e) => setPlaylistPicture(e.target.value)} placeholder="URL" style={{ backgroundColor: "var(--secondary)" }} />
                                </div>
                            </Modal.Content>
                            <Modal.Actions className="recoverPasswordModalButtonContainer">
                                <Button inverted color='red' onClick={(e) => setPlaylistPictureOpenState(false)}><Icon name='remove' />Close</Button>
                                <Button className="ui primary button" onClick={handleUpdatePlaylist}><Icon name='checkmark' />Update</Button>
                            </Modal.Actions>
                        </Modal>

                        <div className="playlistMetadata">
                            <div className="playlistTitleHandling">
                                <input className="playlistTitle" style={{ backgroundColor: "var(--secondary)" }}
                                    maxLength={35} placeholder="Playlist Title" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
                            </div>
                            <div className="playlistTitleDivider ">
                                <div className="ui divider"></div>
                            </div>
                            <p className="playlistNumSongs">{playlistSongs.length} song{playlistSongs.length === 1 ? "" : "s"}, {getSongTime(duration)}</p>
                            <div className="playlistSideButtons">
                                <div className="playlistPlayAllButton">
                                    <button className="clickButton ui button huge" onClick={playRandom}>Play</button>
                                </div>
                                <div className="playlistSave">
                                    <Popup
                                        content='Saved!'
                                        on='click'
                                        pinned
                                        trigger={<button className="clickButton playlistSaveButton ui button" onClick={handleUpdatePlaylist}>
                                            <Icon className="large save outline"></Icon>
                                        </button>}
                                    />

                                    <Modal
                                        basic
                                        onClose={() => setDeletePlaylistOpenState(false)}
                                        onOpen={() => setDeletePlaylistOpenState(true)}
                                        open={deletePlaylistOpenState}
                                        size='small'
                                        trigger={<button className="clickButton playlistSaveButton ui button">
                                            <Icon className="large trash"></Icon>
                                        </button>}>
                                        <Header icon><Icon className='large trash' />Are you sure you want to delete this playlist?</Header>

                                        <Modal.Actions className="recoverPasswordModalButtonContainer">
                                            <Button inverted color='red' onClick={(e) => setDeletePlaylistOpenState(false)}><Icon name='remove' />No</Button>
                                            <Button className="ui primary button" onClick={deletePlaylist}><Icon name='checkmark' />Yes</Button>
                                        </Modal.Actions>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                    <textarea rows={4} className="playlistDescriptionText" style={{ backgroundColor: "var(--secondary)" }}
                        placeholder="Playlist Description" value={playlistDescription ? playlistDescription : ""} onChange={(e) => setPlaylistDescription(e.target.value)} />
                </div>
                <div className="playlistScreenAddSongBox">
                    <div className="addSongEntireContainer">
                        <div className="addSongContainer ui input">
                            <p className="addSongText" >Add Song</p>
                            <div className="addSongSearchContainer ui input">
                                <input className="addSongSearch" onKeyPress={(e) => handleSearchInput(e)} placeholder="Add Song..."></input>
                            </div>
                            <button type="submit" className="clickButton ui icon large button" onClick={() => searchSpotify(searchTerm)}>
                                <i className="search icon"></i>
                            </button>
                            <div className="randomSongButton">
                                <button onClick={getRandomSong} type="submit" className="clickButton ui button">Random Song</button>
                            </div>
                        </div>
                        <div className="playlistAddSongDivider" ></div>

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
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="playlistSongsContainer" {...provided.droppableProps} ref={provided.innerRef}>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "7%" }}></div>
                                <div className="playlistSongsBox">
                                    <div onClick={() => sortSongs(0)} className="playlistSongTitleLabel">Song Title</div>
                                    <div onClick={() => sortSongs(1)} className="playlistSongArtistLabel">Artist</div>
                                    <div onClick={() => sortSongs(2)} className="playlistSongDurationLabel">Duration</div>
                                </div>
                            </div>
                            {playlistSongs.map((song, index) => (
                                <Draggable key={song.key.toString()} draggableId={song.key.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div className="playlistSongBox" style={{ backgroundColor: snapshot.isDragging ? "red" : "blue" }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                            <div style={{ display: "flex", flexDirection: "row", width: "7%" }}>
                                                <div className="songNumber"><p>{index + 1}</p></div>
                                                <Icon className="playlistSongIcon big" name="play circle outline" onClick={() => playSong(index)}></Icon>
                                            </div>

                                            <div className="playlistSongBar" style={((props.currentPlaylistID === playlist._id && index === props.currentSongIndex) || snapshot.isDragging) ?
                                                { backgroundColor: "var(--primary)", fontWeight: "bold", color: "white" }
                                                : { backgroundColor: "var(--secondary)" }
                                            }>
                                                <div className="playlistSongTitle">{song.title}</div>
                                                <div className="playlistSongArtist">{song.artist}</div>
                                                <div className="playlistSongDuration">{getSongTime(song.duration)}</div>
                                            </div>

                                            <Icon className="removeSongIcon large" style={{ width: "3%" }} name="remove" onClick={() => removeSong(song)}></Icon>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default compose(
    graphql(UPDATE_PLAYLIST, { name: 'updatePlaylist' }),
    graphql(DELETE_PLAYLIST, { name: "deletePlaylist" })
)(PlaylistScreen);