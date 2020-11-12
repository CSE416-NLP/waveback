import React, { useState } from 'react'
import SpotifyAuthWindow from "./SpotifyAuthWindow"
import SpotifyPlayer from 'react-spotify-web-playback';


const PlayerScreen = (props) => {
    window.addEventListener("storage", props.authorizeSpotifyFromStorage);
    if (props.playerVisible === null)
        props.setPlayerVisible(true)

    console.log(props.spotifyToken)
    let token = props.spotifyToken;

    // const [tracks, setTracks] = useState(['spotify:track:5yK37zazHUe3WxEvymZs20', "spotify:track:46OFHBw45fNi7QNjSetITR", "spotify:track:2LiDZmGERLzjrtBTCofj2G"])

    return (
        <div>
            {!token && <SpotifyAuthWindow />}
            <div onClick={() => { props.history.push("/") }}>Go back</div>
            <div onClick={() => props.setTracks(["spotify:track:2I3dW2dCBZAJGj5X21E53k", "spotify:track:0N3W5peJUQtI4eyR6GJT5O"])}>New tracks</div>
            <div onClick={() => props.setTracks(["spotify:track:5yK37zazHUe3WxEvymZs20", "spotify:track:46OFHBw45fNi7QNjSetITR", "spotify:track:2LiDZmGERLzjrtBTCofj2G"])}>Original tracks</div>
            {/* <SpotifyPlayer
                token={token}
                uris={tracks}
                name="Waveback"
                styles={{
                    bgColor: "var(--secondary)",
                    sliderColor: "var(--buttonColor)",
                    sliderTrackColor: "var(--primary)",
                    color: "var(--accent)",
                    sliderhandleColor: "var(--accent)",
                    trackNameColor: "var(--buttonColor)",
                    trackArtistColor: "var(--primary)"
                }}
            /> */}
        </div>
    )
}

export default PlayerScreen;