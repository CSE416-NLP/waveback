import React, { useState } from 'react';
import { Modal, Icon, Header, Button, Content } from 'semantic-ui-react';
import { getSpotifyAccessToken } from "../data/LocalStorage.js";
import { useQuery } from '@apollo/react-hooks';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import "../styles/css/index.css"
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from '../cache/mutations';
import { getSongTime } from "../UtilityComponents/Playlist"
// import jsonData from "../data/TestData.json";

var buttonStyle = { color: "var(--background)", backgroundColor: "var(--buttonColor" };

const PlaylistScreen = (props) => {
    if (props.playerVisible === null) {
        props.setPlayerVisible(true);
    }
    let token = props.spotifyToken;

    const [tracks, setTracks] = useState(['spotify:track:5yK37zazHUe3WxEvymZs20']);
    const currentUser = props.user;
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
    // Spotify Song Searching
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResult] = useState([]);

    const handleUpdatePlaylist = async () => {
        setPlaylistPictureOpenState(false);
        const { data } = await props.updatePlaylist({
            variables: {
                _id: playlist._id,
                name: playlistName,
                picture: playlistPicture,
                description: playlistDescription,
                songs: playlistSongs,
                songURIs: playlistSongURIs,
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

    const onClickHandler = (term) => { // Default is all fields, playlist generation may only use song search
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
                setSearchResult(data.tracks.items);
            });
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
        if (event.key === 'Enter') {
            onClickHandler(event.target.value);
        }
    }

    const addSong = async (song) => {
        let newSong = {
            _id: "",
            songURI: song.uri,
            key: playlist.songs.length,
            title: song.name,
            artist: song.artists[0].name,
            album: song.album.name,
            genre: [],
            year: song.album.release_date.substring(0, 4),
            duration: Math.round(song.duration_ms / 1000),
            __typename: "Song",
        }
        let newSongURI = song.uri;
        let newSongs = playlist.songs.push(newSong);
        let newSongURIs = playlist.songURIs.push(newSongURI);
        setPlaylistSongs(newSongs);
        setPlaylistSongURIs(newSongURIs);
    }

    const playSong = (offset) => {
        if (props.playStatus != true){
            props.setPlayStatus(true);
        }
        console.log(props.playStatus)
        props.setTracks({
            offset: offset,
            uris: playlist.songURIs
        })
        
        console.log(offset);
    }
    // const playSong = async (songQuery) => {
    //     console.log(songQuery);

    //     token = "Bearer " + token;
    //     let query = "https://api.spotify.com/v1/search?q=" + songQuery + "&type=track%2Cartist%2Calbum&market=US"

    //     fetch(query, {
    //         method: "GET",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //             "Authorization": token
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // console.log(data);
    //             let songURI = data.tracks.items[0].uri;
    //             // console.log(songURI);
    //             // props.history.push({
    //             //     pathname: '/songplayer',
    //             //     songURI: songURI,
    //             // })
    //             setTracks([songURI]);
    //         });
    // }
    // Calculate the total duration of the playlist.
    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) { duration += playlist.songs[i].duration; }

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
                            <p className="playlistNumSongs">{playlist.songs.length} song{playlist.songs.length === 1 ? "" : "s"}, {getSongTime(duration)}</p>
                            <div className="playlistSideButtons">
                                <div className="playlistPlayAllButton">
                                    <button className="clickButton ui button huge">Play All</button>
                                </div>
                                <div className="playlistSave">
                                    <button className="clickButton playlistSaveButton ui button" onClick={handleUpdatePlaylist}>
                                        <Icon className="large save outline"></Icon>
                                    </button>
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
                        placeholder="Playlist Description" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} />
                </div>
                <div className="playlistScreenAddSongBox">
                    <div className="addSongEntireContainer">
                        <div className="addSongContainer ui input">
                            <p className="addSongText" >Add Song</p>
                            <div className="addSongSearchContainer ui input">
                                <input className="addSongSearch" onKeyPress={(e) => handleSearchInput(e)} placeholder="Add Song..."></input>
                            </div>
                            <button type="submit" style={buttonStyle} className="clickButton ui icon large button" onClick={() => onClickHandler(searchTerm)}>
                                <i className="search icon"></i>
                            </button>
                        </div>
                    <div className="playlistAddSongDivider" ></div>

                        <div className="displaySearchResultsContainer2">
                            <div className="displaySearchResultsContainer">
                                {
                                searchResults.map((song, index) => (
                                    <div className="playlistSearchResultBox">
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
                                                onOpen={() => setSongInfoOpenState(true)}
                                                open={songInfoOpenState}
                                                size='small'
                                                trigger={<button className="searchResultOptionButton clickButton ui icon button" >
                                                            <Icon className="info circle"></Icon>
                                                        </button>}>
                                                <Header icon>More Info</Header>
                                                <Modal.Content>
                                                    <div className="playlistSongSearchResultTitle">{song.name}</div>
                                                    <div className="playlistSongSearchResultDesc">{song.artists[0].name}</div>
                                                </Modal.Content>

                                                <Modal.Actions className="recoverPasswordModalButtonContainer">
                                                    <Button inverted color='red' onClick={(e) => setSongInfoOpenState(false)}><Icon name='close' />Close</Button>
                                                </Modal.Actions>
                                            </Modal>
                                            <button className="searchResultOptionButton clickButton ui icon button" >
                                                <Icon className="play circle"></Icon>
                                            </button>
                                            <button className="searchResultOptionButton clickButton ui icon button" >
                                                <Icon onClick={() => addSong(song)} className="plus circle"></Icon>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>  
                </div>
            </div>

            <div className="playlistSongsContainer">
                <div className="playlistSongsBox">
                    <div className="playlistSongTitleLabel">Song Title</div>
                    <div className="playlistSongArtistLabel">Artist</div>
                    <div className="playlistSongDurationLabel">Duration</div>
                </div>

                {playlist.songs.map((song, index) => (
                    <div className="playlistSongBox">
                        <div className="songNumber"><p>{index + 1}</p></div>
                        <Icon className="playlistSongIcon big" name="play circle outline" onClick={(e) => playSong(index)}></Icon>
                        <div className="playlistSongBar">
                            <div className="playlistSongTitle">{song.title}</div>
                            <div className="playlistSongArtist">{song.artist}</div>
                            <div className="playlistSongDuration">{getSongTime(song.duration)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default compose(
    graphql(UPDATE_PLAYLIST, { name: 'updatePlaylist' }),
    graphql(DELETE_PLAYLIST, { name: "deletePlaylist" })
)(PlaylistScreen);