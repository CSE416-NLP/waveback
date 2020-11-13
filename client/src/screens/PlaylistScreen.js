import React, { useState } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { GET_DB_PLAYLISTS } from '../cache/queries';

import "../styles/css/index.css"
import playlistPlaceholderPicture from "./pictures/playlistPicturePlaceholder.png"
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from '../cache/mutations';

import SpotifyPlayer from 'react-spotify-web-playback';


// TEMPORARY TOKEN FUNCTION:
import { getSpotifyAccessToken } from "../LocalStorage";

// import jsonData from "../TestData.json";

const PlaylistScreen = (props) => {
    if (props.playerVisible === null){
        props.setPlayerVisible(true);
    }
    // console.log(props.spotifyToken);
    let token = props.spotifyToken;
    
    // console.log(props)

    const [tracks, setTracks] = useState(['spotify:track:5yK37zazHUe3WxEvymZs20']);
    const currentUser = props.user;
    const { data, refetch } = useQuery(GET_DB_PLAYLISTS);

    const playlist = props.location.playlist;
    // console.log(playlist.picture === "");
    if (props.location.playlist) {
        // console.log(props.location.playlist)
    }
    // const [playlist, setPlaylist] = useState(props.location.playlist);
    const [playlistName, setPlaylistName] = useState(playlist.name);
    const [playlistDescription, setPlaylistDescription] = useState(playlist.description);
    const [playlistPicture, setPlaylistPicture] = useState(playlist.picture ? playlist.picture : playlistPlaceholderPicture);
    const [playlistPictureOpenState, setPlaylistPictureOpenState] = useState(false);
    const [deletePlaylistOpenState, setDeletePlaylistOpenState] = useState(false);

    const [songURI, setSongURI] = useState("");
    // Convert a time in seconds into minutes and seconds.
    const secToFormattedTime = (seconds) => {
        let m = Math.floor(seconds / 60);
        let s = seconds %= 60;
        s = (s < 10) ? (s = "0" + s) : s
        return m + ":" + s;
    }

    const handleUpdatePlaylist = async () => {
        setPlaylistPictureOpenState(false);
        const { data } = await props.updatePlaylist({
            variables: {
                _id: playlist._id,
                name: playlistName,
                picture: playlistPicture,
                description: playlistDescription,
                // songs: songs,
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

    const playSong = async (songQuery) => {
        console.log(songQuery);

        token = "Bearer " + token;
        let query = "https://api.spotify.com/v1/search?q=" + songQuery + "&type=track%2Cartist%2Calbum&market=US"

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
                // console.log(data);
                let songURI = data.tracks.items[0].uri;
                // console.log(songURI);
                // props.history.push({
                //     pathname: '/songplayer',
                //     songURI: songURI,
                // })
                setTracks([songURI]);
            });



    }
    // Calculate the total duration of the playlist.
    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) { duration += playlist.songs[i].duration; }

    let spotifyToken = getSpotifyAccessToken();
    return (
        <div className="playlistScreen" style={{ backgroundColor: "var(--background)" }}>
           
            <div className="playlistScreenLeftBox" style={{ backgroundColor: "var(--background)" }}>
                <div className="playlistScreenLeftContainer" style={{ backgroundColor: "var(--secondary)", filter: "drop-shadow(5px 0px 0px var(--accent))" }}>
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
                                    maxLength={30} placeholder="Playlist Title" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
                            </div>
                            <div className="playlistTitleDivider ">
                                <div className="ui divider"></div>
                            </div>
                            <p className="playlistNumSongs">{playlist.songs.length} song{playlist.songs.length == 1 ? "" : "s"}, {secToFormattedTime(duration)}</p>
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

                    <textarea rows={4} className="playlistDescriptionText" style={{ backgroundColor: "var(--secondary)" }}
                        placeholder="Playlist Description" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} />

                    <div className="playlistPlayAllButton">
                        <button className="clickButton ui button massive">Play All</button>
                    </div>
                    <p className="playlistGenreLabel" style={{ color: "var(--accent)" }}>Genres</p>
                    <div className="playlistGenreBox">
                        {/* List of all genres in the playlist goes here. */}
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
                        <p className="songNumber">{index + 1}</p>
                        <Icon className="playlistSongIcon big" name="play circle outline" onClick={(e) => playSong(song.title)}></Icon>
                        <div className="playlistSongBar">
                            <div className="playlistSongTitle">{song.title}</div>
                            <div className="playlistSongArtist">{song.artist}</div>
                            <div className="playlistSongDuration">{secToFormattedTime(song.duration)}</div>
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