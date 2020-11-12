import React, { useState } from 'react';
import { getSpotifyAccessToken } from "../LocalStorage.js";
const LockedScreen = (props) => {
    // This is an example of only allowing the user to visit this page if some requirement is met
    // if (!props.location.key)
    //     return <Redirect to="/" />

    const [data, setData] = useState(null);

    const queryAPI = (songID) => {
        // Nate's YouTube API key is AIzaSyBqoZTfsx0o7_2UBNBPKOMGRREY6Qg2wAc
        let APIKey = "&key=AIzaSyBqoZTfsx0o7_2UBNBPKOMGRREY6Qg2wAc";
        let options = "&part=snippet,contentDetails,statistics,status";
        let query = "https://www.googleapis.com/youtube/v3/videos?id=" + songID + APIKey + options;

        fetch(query, {                      // Attempt to get some data from YouTube
            method: "GET",
        })
            .then(response => response.json())  // Turn the reponse into JSON representation
            .then(data => {
                if (data && data.items && data.items[0]) {
                    console.log(data.items[0])
                    setData(data.items[0]);     // Use the JSON however we see fit
                }
            });
    }

    const onClickHandler = (term) => { // Default is all fields, playlist generation may only use song search
        let token = getSpotifyAccessToken();
        console.log(token);
        token = "Bearer "+token;
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
            });
    }

    const [searchTerm, setSearch] = useState("");
    return (
        <div className="App" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <div>
                <button onClick={() => queryAPI("-tJYN-eG1zk")}>Play Queen</button>
                <button onClick={() => queryAPI("-cmSCQbWxV0")}>Play Kanye</button>
                <div>
                    <input value={searchTerm} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search.." className="discoverSearch"></input>
                    <button onClick={() => onClickHandler(searchTerm)}>Query Data in Console</button>
                </div>

            </div>
            {data && <div style={{ flex: "1" }}>
                <iframe title="bideo" src={"http://www.youtube.com/embed/" + data.id}
                    width="100%" height="100%" frameBorder="0" allowFullScreen={true} />
            </div>}
            {data && <div>Duration: {data.contentDetails.duration} | VideoID: {data.id}</div>}
        </div>
    );
};

export default LockedScreen;