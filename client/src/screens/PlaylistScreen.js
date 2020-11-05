import React, { useState } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import "../styles/css/index.css"
import playlistPlaceholderPicture from "./pictures/playlistPicturePlaceholder.png"
import jsonData from "../TestData.json";

const PlaylistScreen = (props) => {
    const currentUser = props.user;
    const playlist = props.location.playlist;
    // console.log(playlist.picture === "");
    if (props.location.playlist) {
        console.log(props.location.playlist)
    }
    // const [playlist, setPlaylist] = useState(props.location.playlist);
    const [playlistName, setPlaylistName] = useState(playlist.name);
    const [playlistDescription, setPlaylistDescription] = useState(playlist.description);
    const [playlistPicture, setPlaylistPicture] = useState(playlist.picture ? playlist.picture : playlistPlaceholderPicture);
    const [playlistPictureOpenState, setPlaylistPictureOpenState] = useState(false);
    // Convert a time in seconds into minutes and seconds.
    const secToFormattedTime = (seconds) => {
        let m = Math.floor(seconds / 60);
        let s = seconds %= 60;
        s = (s < 10) ? (s = "0" + s) : s
        return m + ":" + s;
    }

    const updatePlaylist = async () => {
        setPlaylistPictureOpenState(false);

        const updated = await props.updatePlaylist({
            variables: {
                _id: currentUser._id,
                playlistName
            }
        })

        if (updated) console.log("Saved successfully");
        else console.log("Error in saving");
        props.fetchUser();
    }
    // Calculate the total duration of the playlist.
    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) { duration += playlist.songs[i].duration; }

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
                                <Button className="ui primary button" onClick={updatePlaylist}><Icon name='checkmark' />Update</Button>
                            </Modal.Actions>
                        </Modal>

                        <div className="playlistMetadata">
                            <input className="playlistTitle" style={{ backgroundColor: "var(--secondary)" }}
                                placeholder="Playlist Title" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
                            <Icon className="playlistSave" name="save outline" onClick={updatePlaylist}></Icon>
                            <p className="playlistNumSongs">{playlist.songs.length} song{playlist.songs.length > 1 ? "s" : ""}, {secToFormattedTime(duration)}</p>
                        </div>
                    </div>

                    <textarea className="playlistDescriptionText" style={{ backgroundColor: "var(--secondary)" }}
                        placeholder="Playlist Description" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} />

                    <div className="playlistPlayAllButton">
                        <button style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="ui button massive">Play All</button>
                    </div>
                    <p className="playlistGenreLabel" style={{ color: "var(--accent)" }}>Genres</p>
                    <div className="playlistGenreBox">
                        {/* <div className="playlistGenreText">{playlist.songs[0].genre + ""}</div>
                        <div className="playlistGenreText">{playlist.songs[1].genre + ""}</div>
                        <div className="playlistGenreText">{playlist.songs[2].genre + ""}</div>
                        <div className="playlistGenreText">{playlist.songs[3].genre + ""}</div> */}
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
                        <Icon className="playlistSongIcon big" name="play circle outline"></Icon>
                        <div className="playlistSongBar">
                            <div className="playlistSongTitle">{song.name}</div>
                            <div className="playlistSongArtist">{song.artist}</div>
                            <div className="playlistSongDuration">{secToFormattedTime(song.duration)}</div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default PlaylistScreen;