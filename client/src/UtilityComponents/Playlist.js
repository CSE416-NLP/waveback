import React from 'react';
import "../styles/css/index.css";

export const getSongTime = (seconds) => {
    let m = Math.floor(seconds / 60);
    let s = seconds %= 60;
    s = (s < 10) ? (s = "0" + s) : s
    return m + ":" + s;
}

export const getAlbumTime = (songs) => {
    let seconds = 0;
    for (let song of songs)
        seconds += song.duration ? song.duration : 0;
    let h = Math.floor(seconds / 3600);
    if (h >= 1) { return new Date(seconds * 1000).toISOString().substr(11, 8); }
    let m = Math.floor(seconds / 60);
    let s = seconds %= 60;
    s = (s < 10) ? (s = "0" + s) : s
    let str = ""
    if (h > 0)
        str += h + ":"
    if (m > 0)
        str += m + ":"
    str += s
    return str;
}

const Playlist = (props) => {
    const playlist = props.playlist
    return (
        <div className='playlist'>
            <img className="playlist_art" src={playlist.picture} alt="" />
            <div className="playlistTextContainer">
                <div className="playlistName">{playlist.name}</div>
                <div className="playlistInfo">
                    <div className="playlistSubText">by {playlist.owner}</div>
                    <div className="playlistSubText">{playlist.songs.length} song{playlist.songs.length === 1 ? "" : "s"}  -  {getAlbumTime(playlist.songs)}</div>
                    <div className="playlistSubText">{playlist.tags.map((tag, i) => i === (playlist.tags.length - 1) ? tag : tag + ", ")}</div>
                    <div className="playlistSubText">Followers: {playlist.followers}</div>
                </div>
            </div>
        </div>
    )
}
export default Playlist;