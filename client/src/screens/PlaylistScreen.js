import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import "../styles/css/index.css"

const PlaylistScreen = (props) => {
    console.log(props)
    if (props.history.location.playlist) {
        console.log(props.history.location.playlist)
    }
    const [playlist, updatePlaylist] = useState(props.history.location.playlist);
    // console.log(playlist);
    return (
        <div className="playlistScreen" style={{ backgroundColor: "var(--background)" }}>
            <div className="playlistScreenLeftBox" style={{ backgroundColor: "var(--background)" }}>
                <div className="playlistScreenLeftContainer" style={{ backgroundColor: "var(--secondary)", filter: "drop-shadow(5px 0px 0px var(--accent))" }}>
                    <div className="playlistInfo">
                        <img className="playlistArt" src={playlist.picture} alt="" />
                        <h1 className="playlistInfo">Nathan's Gaming Playlist</h1>
                    </div>

                    <p className="playlistGenreLabel" style={{ color: "var(--accent)" }}>Genre</p>
                    <div className="playlistGenreBox">
                        <div className="playlistGenreText">Hip-Hop</div>
                        <div className="playlistGenreText">Classical</div>
                        <div className="playlistGenreText">Pop</div>
                        <div className="playlistGenreText">Rock</div>
                    </div>
                </div>

            </div>
            <div className="playlistSongsContainer">
                <div className="playlistSongsBox">
                    <div className="playlistSongTitle">Song Title</div>
                    <div className="playlistSongArtist">Artist</div>
                    <div className="playlistSongDuration">Duration</div>

                    {playlist.songs.map((song, index) => (
                        <div className="playlistSongBox">
                            <Icon className="playlistSongIcon" name="play circle outline"></Icon>
                            <div className="playlistSongBar">
                                <div className="playlistSongTitle">{song.name}</div>
                                <div className="playlistSongArtist">{song.artist}</div>
                                <div className="playlistSongDuration">{song.duration}</div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
};

export default PlaylistScreen;