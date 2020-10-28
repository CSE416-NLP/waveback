import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import "../styles/css/index.css"
import jsonData from "../TestData.json";

const PlaylistScreen = (props) => {
    console.log(props)
    if (props.history.location.playlist) {
        console.log(props.history.location.playlist)
    }
    // const [playlist, updatePlaylist] = useState(props.history.location.playlist);
    const [playlist, updatePlaylist] = useState(jsonData.Playlists[3]);
    // console.log(playlist);
    return (
        <div className="playlistScreen" style={{ backgroundColor: "var(--background)" }}>
            <div className="playlistScreenLeftBox" style={{ backgroundColor: "var(--background)" }}>
                <div className="playlistScreenLeftContainer" style={{ backgroundColor: "var(--secondary)", filter: "drop-shadow(5px 0px 0px var(--accent))" }}>
                    <div className="playlistScreenInfo">
                        <img className="playlistArt" src={playlist.picture} alt="" />
                        <div className="playlistMetadata">
                            <h1 className="playlistTitle">{playlist.name}</h1>
                            <p className="playlistNumSongs">{playlist.songs.length} song(s)</p>
                        </div>
                    </div>

                    <p className="playlistGenreLabel" style={{ color: "var(--accent)" }}>Genres</p>
                    <div className="playlistGenreBox">
                        <div className="playlistGenreText">{playlist.songs[0].genre + ""}</div>
                        <div className="playlistGenreText">{playlist.songs[1].genre + ""}</div>
                        <div className="playlistGenreText">{playlist.songs[2].genre + ""}</div>
                        <div className="playlistGenreText">{playlist.songs[3].genre + ""}</div>
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
                        <Icon className="playlistSongIcon big" name="play circle outline"></Icon>
                        <div className="playlistSongBar">
                            <div className="playlistSongTitle">{song.name}</div>
                            <div className="playlistSongArtist">{song.artist}</div>
                            <div className="playlistSongDuration">{song.duration}</div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default PlaylistScreen;