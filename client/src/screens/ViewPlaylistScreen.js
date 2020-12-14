import React, { useState, useEffect } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useQuery } from '@apollo/react-hooks';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import "../styles/css/index.css"
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from '../cache/mutations';
import { getSongTime, getAlbumTime } from "../UtilityComponents/Playlist";
import { Link } from "react-router-dom"
import * as mutations from '../cache/mutations';

const ObjectId = require("mongoose").Types.ObjectId;

const ViewPlaylistScreen = (props) => {

    useEffect(() => {
        if (!props.location.playlist) {
            console.log("no props");
            props.history.push("/discover");
        }
    }, [props]);

    const { refetch } = useQuery(GET_DB_PLAYLISTS);
    const currentUser = props.user
    const [playlist, setPlaylist] = useState(props.location.playlist);
    const [playlistName, setPlaylistName] = useState(playlist?.name);
    const [playlistDescription, setPlaylistDescription] = useState(playlist?.description);
    const [playlistPicture, setPlaylistPicture] = useState(playlist?.picture ? playlist?.picture : "https://i.imgur.com/ZRoNOEu.png");
    const [playlistSongs, setPlaylistSongs] = useState(playlist?.songs);
    const [playlistSongURIs, setPlaylistSongURIs] = useState(playlist?.songURIs);
    const [sortState, setSortState] = useState("normal");
    const [songHoverState, setSongHoverState] = useState(null);
    const [songInfoOpenState, setSongInfoOpenState] = useState(false);
    // Song Filtering
    const [filter, setFilter] = useState("");
    if (!props.location.playlist) {
        return <></>
    }


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

    const playSong = (offset) => {
        checkPlayerStatus();
        props.setPlayStatus(false);
        props.setTracks({
            offset: offset,
            uris: playlistSongURIs
        })
        props.setPlayStatus(true);
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
        modifyPlaylist(new_playlist);
    }

    const sortSongs = (newType) => {
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
        <div className="viewPlaylistScreen" style={{ backgroundColor: "var(--background)" }}>
            <div className="playlistScreenLeftBox" style={{ backgroundColor: "var(--background)" }}>
                <div className="viewPlaylistScreenLeftContainer">
                    <div className="playlistScreenInfo">
                        <img className="playlistArt" src={playlistPicture} alt="" />

                        <div className="playlistMetadata">
                            <div className="playlistTitleHandling">
                                <div className="viewPlaylistTitle" maxLength={35}>{playlistName ? playlistName : "Unnamed Playlist"}</div>
                            </div>
                            <div className="ui divider"></div>
                            <p className="playlistNumSongs">{playlistSongs.length} song{playlistSongs.length === 1 ? "" : "s"}, {getAlbumTime(playlistSongs)}</p>
                            <div className="playlistSideButtons">
                                <div className="viewPlaylistPlayAllButton">
                                    <button className="clickButton ui button huge" onClick={playRandom}>Play Random</button>
                                </div>
                                <div>
                                    <button className="playlistShuffleButton clickButton ui icon button" onClick={shufflePlaylist}>
                                        <Icon className="large shuffle"></Icon>
                                    </button>
                                    <Link to={{ pathname: "/playlists" }}>
                                        <button className="playlistCopyButton clickButton ui icon button" onClick={copyPlaylist}>
                                            <Icon className="large copy"></Icon>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="viewPlaylistDescriptionContainer">
                        <textarea className="viewPlaylistDescription" rows={12}
                            disabled placeholder="Playlist Description" value={playlistDescription ? playlistDescription : ""}>
                        </textarea>
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="playlistSongsContainer" {...provided.droppableProps} ref={provided.innerRef}>
                            <div className="playlistFilterContainer">
                                <div className="viewPlaylistFilterDivider"></div>
                                <div className="ui input">
                                    <input placeholder="Filter..." size="40" className="playlistFilter"
                                        onKeyUp={(e) => setFilter(e.target.value)} style={{ backgroundColor: "var(--secondary)" }}>
                                    </input>
                                    <button type="submit" className="clickButton fluid ui icon button">
                                        <i className="search icon"></i>
                                    </button>
                                </div>
                                <div className="viewPlaylistFilterDivider"></div>
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
                                <div className="playlistSongBox" ref={provided.innerRef}
                                    onMouseEnter={() => setSongHoverState(song.title)} onMouseLeave={() => setSongHoverState(null)} >
                                    <div className="playlistSongIcon" style={{ display: "flex", flexDirection: "row", width: "7%" }}>
                                        <Icon className="big" name="play circle outline" onClick={() => playSong(index)}></Icon>
                                    </div>
                                    <div className="playlistSongBar" style={((props.currentPlaylistID === playlist._id && index === props.currentSongIndex) || snapshot.isDragging) ?
                                        { backgroundColor: "var(--primary)", fontWeight: "bold", color: "white" }
                                        : { backgroundColor: "var(--secondary)" }
                                    }>
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
                                </div>
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
)(ViewPlaylistScreen);