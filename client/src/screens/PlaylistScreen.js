import React, { useState, useEffect } from 'react';
import { Modal, Icon, Header, Button, Popup } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getSpotifyAccessToken } from "../data/LocalStorage.js";
import { useQuery } from '@apollo/react-hooks';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import "../styles/css/index.css"
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from '../cache/mutations';
import { getSongTime, getAlbumTime } from "../UtilityComponents/Playlist";
import PrivacyPicker from "../UtilityComponents/PrivacyPicker.js";
import SongSearch from "../UtilityComponents/SongSearch";
import { PlaylistTransaction } from '../utils/jsTPS';
import { Link } from "react-router-dom"
import * as mutations from '../cache/mutations';

const ObjectId = require("mongoose").Types.ObjectId;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const PlaylistScreen = (props) => {
    if (!props.location.playlist) {
        console.log("no props");
        props.history.push("/discover");
    } else {

    }
    try {
        const [test, setTest] = useState(props.location.playlist);
    } catch {
        props.history.push("/discover");
    }

    const { data, refetch } = useQuery(GET_DB_PLAYLISTS);
    const currentUser = props.user
    const [playlist, setPlaylist] = useState(props.location.playlist);
    const [playlistName, setPlaylistName] = useState(props.location.playlist.name);
    const [playlistDescription, setPlaylistDescription] = useState(props.location.playlist.description);
    const [playlistPicture, setPlaylistPicture] = useState(props.location.playlist.picture ? props.location.playlist.picture : "https://i.imgur.com/ZRoNOEu.png");
    const [playlistPictureOpenState, setPlaylistPictureOpenState] = useState(false);
    const [deletePlaylistOpenState, setDeletePlaylistOpenState] = useState(false);
    const [playlistSongs, setPlaylistSongs] = useState(props.location.playlist.songs);
    const [playlistSongURIs, setPlaylistSongURIs] = useState(props.location.playlist.songURIs);
    const [sortState, setSortState] = useState("normal");
    const [songHoverState, setSongHoverState] = useState(null);
    const [songInfoOpenState, setSongInfoOpenState] = useState(false);
    // Spotify Song Searching
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    // Song Filtering
    const [filter, setFilter] = useState("");

    useEffect(() => {
        // async function loadPlaylists() {
        //     setPlaylistSongs(props.location.playlist.songs);
        // }
        // loadPlaylists();
        // console.log("useeffect")
        // console.log(props);
        // console.log(playlistSongs);
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
            props.tps.clearAllTransactions();
        }
    }, [props]);

    const getPlaylistObject = (name, picture, description, songs, songURIs) => {
        let newPlaylist = {
            _id: playlist._id,
            key: playlist.key,
            owner: playlist.owner,
            name: name,
            picture: picture,
            description: description,
            songs: songs,
            songURIs: songURIs,
            followers: playlist.followers,
            visibility: playlist.visibility,
            tags: playlist.tags,
            duration: parseInt(getAlbumTime(playlistSongs))
        }
        return newPlaylist;
    }

    const modifyPlaylist = (playlist) => {
        setPlaylistName(playlist.name);
        setPlaylistPicture(playlist.picture);
        setPlaylistDescription(playlist.description);
        setPlaylistSongs(playlist.songs);
        setPlaylistSongURIs(playlist.songURIs);
        updateTracks(playlist.songURIs, props.currentSongIndex);
        setPlaylist(playlist);
    }


    const savePlaylist = async () => {
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
                console.log(data);
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

    const handleNameChange = (name) => {
        setPlaylistName(name);
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let new_playlist = getPlaylistObject(name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
    }

    const handleDescriptionChange = (description) => {
        setPlaylistDescription(description);
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let new_playlist = getPlaylistObject(playlist.name, playlist.picture, description, playlist.songs, playlist.songURIs);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
    }

    const updatePlaylistPicture = (picture) => {
        if (playlistPictureOpenState) {
            setPlaylistPictureOpenState(false);
        }
        setPlaylistPicture(picture);
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let new_playlist = getPlaylistObject(playlist.name, picture, playlist.description, playlist.songs, playlist.songURIs);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
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
            albumPicture: song.album.images[0].url,
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
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let new_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, newSongs, newSongURIs);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
    }

    const removeSong = (song) => {
        let songs = [...playlistSongs];
        let URIs = [...playlistSongURIs];
        songs.splice(playlistSongs.indexOf(song), 1);
        URIs.splice(playlistSongURIs.indexOf(song.songURI), 1);
        setPlaylistSongs(songs);
        setPlaylistSongURIs(URIs);
        updateTracks(URIs, props.currentSongIndex);
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let new_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, songs, URIs);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
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

    const shufflePlaylist = () => {
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let songs = [...playlistSongs];
        songs = songs.sort(() => Math.random() - 0.5);
        let URIs = []
        for (let i = 0; i < songs.length; i++) {
            URIs.push(songs[i].songURI);
        }
        console.log(songs);
        let new_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, songs, URIs);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
    }

    const sortSongs = (newType) => {
        console.log(sortState);
        let songs = [...playlistSongs];
        let currentURI = playlistSongURIs[props.currentSongIndex];
        if (newType === 0) {
            if (sortState === "reverse") {
                setSortState("normal");
                songs.sort(function (a, b) { return a.title.localeCompare(b.title); });
            }
            else if (sortState === "normal") {
                setSortState("reverse");
                songs.sort(function (a, b) { return b.title.localeCompare(a.title); });
            }
        }
        else if (newType === 1) {
            if (sortState === "reverse") {
                setSortState("normal");
                songs.sort(function (a, b) { return a.artist.localeCompare(b.artist); });
            }
            else if (sortState === "normal") {
                setSortState("reverse");
                songs.sort(function (a, b) { return b.artist.localeCompare(a.artist); });
            }
        }
        else if (newType === 2) {
            if (sortState === "reverse") {
                setSortState("normal");
                songs.sort(function (a, b) { return a.album.localeCompare(b.album); });
            }
            else if (sortState === "normal") {
                setSortState("reverse");
                songs.sort(function (a, b) { return b.album.localeCompare(a.album); });
            }
        }
        else {
            if (sortState === "reverse") {
                setSortState("normal");
                songs.sort(function (a, b) { return a.duration - b.duration; });
            }
            else if (sortState === "normal") {
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
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let new_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, songs, newSongURIs);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
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
        let old_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, playlist.songs, playlist.songURIs);
        setPlaylist(old_playlist);
        let new_playlist = getPlaylistObject(playlist.name, playlist.picture, playlist.description, songsCopy, songURIsCopy);
        let transaction = new PlaylistTransaction(old_playlist, new_playlist, modifyPlaylist);
        props.tps.addTransaction(transaction);
    }

    const invalidImage = (e) => {
        e.target.src = "https://i.imgur.com/ZRoNOEu.png";
        setPlaylistPicture("https://i.imgur.com/ZRoNOEu.png");
    }

    const tpsUndo = () => {
        props.tps.undoTransaction();
    }

    const tpsRedo = () => {
        props.tps.doTransaction();
    }

    const handleKeyPress = (e) => {
        if (e.ctrlKey && e.keyCode === 90) {          // Ctrl + Z
            e.preventDefault();
            console.log("Ctrl + Z pressed");
            tpsUndo()
        }
        else if (e.ctrlKey && e.keyCode === 89) {     // Ctrl + Y
            e.preventDefault();
            console.log("Ctrl + Y pressed");
            tpsRedo()
        }
        else if (e.ctrlKey && e.keyCode === 83) {     // Ctrl + S
            e.preventDefault();
            console.log("Ctrl + S pressed");
            savePlaylist();
        }
    };

    const copyPlaylist = async () => {
        console.log(currentUser);
        console.log(playlist);
        let songsCopy = [...playlistSongs];
        for (let i = 0; i < songsCopy.length; i++) {
            if (!songsCopy[i]._id) songsCopy[i]._id = ObjectId();
            delete songsCopy[i].__typename;
        }
        // Create new playlist that is copy of current one.
        let newPlaylist = {
            key: currentUser.playlists.length,
            owner: currentUser.username,
            name: playlistName,
            picture: playlistPicture,
            description: playlistDescription,
            songs: songsCopy,
            songURIs: playlistSongURIs,
            followers: playlist.followers,
            visibility: currentUser.defaultVisibility,
            tags: playlist.tags,
            duration: playlist.duration,
        }
        // Add playlist to database
        const { data } = await props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
        if (data.addPlaylist) {
            props.history.push({
                pathname: '/playlist/' + currentUser.username + '/' + data.addPlaylist,
                playlist: {
                    _id: data.addPlaylist,
                    ...newPlaylist
                },
                refreshList: refetch
            })
        }
    }

    return (
        <div className="playlistScreen" style={{ backgroundColor: "var(--background)" }} onMouseEnter={() => setSongHoverState(null)}>
            <div className="playlistScreenLeftBox" style={{ backgroundColor: "var(--background)" }}>
                <div className="playlistScreenLeftContainer">
                    <div className="playlistScreenInfo">
                        <Modal
                            basic
                            onClose={() => setPlaylistPictureOpenState(false)}
                            onOpen={() => setPlaylistPictureOpenState(true)}
                            open={playlistPictureOpenState}
                            size='small'
                            trigger={<img onError={invalidImage} className="playlistArt" src={playlistPicture} alt="" />}>
                            <Header icon><Icon name='user circle' />Update Playlist Picture</Header>
                            <Modal.Content>
                                <div className="ui input changeAvatarTextField">
                                    <input size="50" onChange={(e) => setPlaylistPicture(e.target.value)} placeholder="URL" style={{ backgroundColor: "var(--secondary)" }} />
                                </div>
                            </Modal.Content>
                            <Modal.Actions className="recoverPasswordModalButtonContainer">
                                <Button inverted color='red' onClick={() => setPlaylistPictureOpenState(false)}><Icon name='remove' />Close</Button>
                                <Button className="ui primary button" onClick={updatePlaylistPicture}><Icon name='checkmark' />Update</Button>
                            </Modal.Actions>
                        </Modal>
                        <div className="playlistMetadata">
                            <div className="playlistTitleHandling">
                                <input className="playlistTitle" style={{ backgroundColor: "var(--secondary)" }}
                                    maxLength={35} placeholder="Playlist Title" value={playlistName} onChange={(e) => handleNameChange(e.target.value)}
                                />
                            </div>
                            <div className="playlistTitleDivider ">
                                <div className="ui divider"></div>
                            </div>
                            <p className="playlistNumSongs">{playlistSongs.length} song{playlistSongs.length === 1 ? "" : "s"}, {getAlbumTime(playlistSongs)}</p>
                            <div className="playlistSideButtons">
                                <div className="playlistPlayAllButton">
                                    <button className="clickButton ui button huge" onClick={playRandom}>Play Random</button>
                                </div>
                                <div className="playlistSave">
                                    <Link to={{ pathname: "/playlists" }}>
                                        <button className="playlistCopyButton clickButton ui button icon" onClick={copyPlaylist}>
                                            <Icon className="large copy"></Icon>
                                        </button>
                                    </Link>
                                    <Popup
                                        content='Saved!'
                                        on='click'
                                        pinned
                                        trigger={<button className="clickButton playlistSaveButton ui button icon" onClick={savePlaylist}>
                                            <Icon className="large save outline"></Icon>
                                        </button>}
                                    />
                                    <Modal
                                        basic
                                        onClose={() => setDeletePlaylistOpenState(false)}
                                        onOpen={() => setDeletePlaylistOpenState(true)}
                                        open={deletePlaylistOpenState}
                                        size='small'
                                        trigger={<button className="clickButton playlistSaveButton ui button icon">
                                            <Icon className="large trash"></Icon>
                                        </button>}>
                                        <Header icon><Icon className='large trash' />
                                            Are you sure you want to delete this playlist?
                                            <br></br>
                                            <div className="irreversible">THIS IS NOT REVERSIBLE!</div>
                                        </Header>
                                        <Modal.Actions className="recoverPasswordModalButtonContainer">
                                            <Button className="ui primary button" onClick={deletePlaylist}><Icon name='checkmark' />Yes</Button>
                                            <Button inverted color='red' onClick={(e) => setDeletePlaylistOpenState(false)}><Icon name='remove' />No</Button>
                                        </Modal.Actions>
                                    </Modal>

                                </div>

                            </div>

                        </div>

                    </div>
                    <textarea rows={4} className="playlistDescriptionText" style={{ backgroundColor: "var(--secondary)" }}
                        placeholder="Playlist Description" value={playlistDescription ? playlistDescription : ""} onChange={(e) => handleDescriptionChange(e.target.value)}>
                    </textarea>
                </div>
                <div className="playlistScreenAddSongBox">
                    <div className="addSongEntireContainer">
                        <div className="addSongContainer ui input">
                            <p className="addSongText" >Add Song</p>
                            <div className="addSongSearchContainer ui input">
                                <input className="addSongSearch" onKeyUp={(e) => handleSearchInput(e)} placeholder="Add Song..."></input>
                            </div>
                            <button type="submit" className="clickButton ui icon large button" onClick={() => searchSpotify(searchTerm)}>
                                <i className="search icon"></i>
                            </button>
                            <div className="randomSongButton">
                                <button onClick={getRandomSong} type="submit" className="clickButton ui button">Random Song</button>
                            </div>
                        </div>
                        <div className="playlistAddSongDivider" ></div>
                        <SongSearch searchResults={searchResults} addSong={addSong} playSongByURI={playSongByURI} />
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="playlistSongsContainer" {...provided.droppableProps} ref={provided.innerRef}>
                            <div className="playlistFilterContainer">
                                <div className="playlistFilterDivider"></div>
                                <div className="playlistShuffleButton">
                                    <button className="clickButton ui icon button" onClick={shufflePlaylist}>
                                        <Icon className="shuffle"></Icon>
                                    </button>
                                </div>
                                <div className="ui input">

                                    <input placeholder="Filter..." size="40" className="playlistFilter"
                                        style={{ backgroundColor: "var(--secondary)" }} onKeyUp={(e) => setFilter(e.target.value)}>
                                    </input>
                                    <button type="submit" className="clickButton fluid ui icon button">
                                        <i className="search icon"></i>
                                    </button>
                                </div>
                                <div className="playlistFilterDivider"></div>
                                <PrivacyPicker className="dropdownChangePlaylistPrivacy"></PrivacyPicker>
                                <div className="playlistFilterDivider"></div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "7%" }}></div>
                                <div className="playlistSongsBox">
                                    <div onClick={() => sortSongs(0)} className="playlistSongTitleLabel">Song Title</div>
                                    <div onClick={() => sortSongs(1)} className="playlistSongArtistLabel">Artist</div>
                                    <div onClick={() => sortSongs(2)} className="playlistSongAlbumLabel">Album</div>
                                    <div onClick={() => sortSongs(3)} className="playlistSongDurationLabel">Duration</div>
                                </div>
                            </div>
                            {playlistSongs.filter(song => song.title.toLowerCase().substring(0, filter.length).includes(filter.toLowerCase())).map((song, index) => (
                                <Draggable key={song.key.toString()} draggableId={song.key.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div className="playlistSongBox" style={{ backgroundColor: snapshot.isDragging ? "red" : "blue" }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                            <div className="playlistSongIcon" style={{ display: "flex", flexDirection: "row", width: "7%" }}>
                                                <Icon className="big" name="play circle outline" onClick={() => playSong(index)}></Icon>
                                            </div>
                                            <div className="playlistSongBar" style={((props.currentPlaylistID === playlist._id && index === props.currentSongIndex) || snapshot.isDragging) ?
                                                { backgroundColor: "var(--primary)", fontWeight: "bold", color: "white" }
                                                : { backgroundColor: "var(--secondary)" }
                                            }
                                                onMouseEnter={() => setSongHoverState(song.title)}
                                            >
                                                <div className="playlistSongTitle">{song.title}</div>
                                                <div className="playlistSongArtist">{song.artist}</div>
                                                <div className="playlistSongAlbum">{song.album}</div>
                                                <div className="playlistSongDuration">{getSongTime(song.duration)}</div>
                                            </div>
                                            <Modal
                                                onClose={() => setSongInfoOpenState(false)}
                                                onOpen={() => setSongInfoOpenState(song)}
                                                open={Boolean(songInfoOpenState)}
                                                size='small'
                                                trigger={
                                                    <Icon className="removeSongIcon large" style={{
                                                        width: "3%", display: (song.title === songHoverState) ? "block" : "none"
                                                    }}
                                                        name="info circle" >
                                                    </Icon>}>
                                                <Header icon>Song Info</Header>
                                                <Modal.Content>
                                                    <div className="moreInfoContainer">
                                                        <img className="playlistSRRArt" src={songInfoOpenState ? songInfoOpenState.albumPicture : ""} alt="" />
                                                        <div>
                                                            <div className="playlistSRRTitle">{songInfoOpenState ? songInfoOpenState.title : ""}</div>
                                                            <div className="playlistSRRArtist">{songInfoOpenState ? songInfoOpenState.artist : ""}</div>
                                                            <div className="playlistSRRAlbum">{
                                                                songInfoOpenState ? songInfoOpenState.album + ", " + songInfoOpenState.year : ""
                                                            }</div>
                                                            <br></br>
                                                            <div className="playlistSRRDuration">{
                                                                songInfoOpenState ? "Duration: " + getSongTime(Math.round(songInfoOpenState.duration)) : ""
                                                            }</div>
                                                        </div>
                                                    </div>
                                                </Modal.Content>
                                                <Modal.Actions className="recoverPasswordModalButtonContainer">
                                                    <Button inverted color='red' onClick={(e) => setSongInfoOpenState(false)}><Icon name='close' />Close</Button>
                                                </Modal.Actions>
                                            </Modal>
                                            <Icon className="removeSongIcon large" style={{
                                                width: "3%", display: (song.title === songHoverState) ? "block" : "none"
                                            }}
                                                name="remove" onClick={() => removeSong(song)}>
                                            </Icon>
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
    graphql(mutations.ADD_PLAYLIST, { name: 'addPlaylist' }),
    graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" }),
    graphql(UPDATE_PLAYLIST, { name: 'updatePlaylist' }),
    graphql(DELETE_PLAYLIST, { name: "deletePlaylist" })
)(PlaylistScreen);