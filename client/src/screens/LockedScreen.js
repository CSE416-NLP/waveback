import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

/*  This is really more of a testing file for playing around with the router 
    but maybe you guys find it interesting to look at as something that can
    be done.  */

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

    const parseTime = (ISO_8601_String) => {
        // Holy cow this is annoying, I give up for now

        // let regexString = "PT";
        // if (ISO_8601_String.includes("H"))
        //     regexString += "(\\d+H)";
        // if (ISO_8601_String.includes("M"))
        //     regexString += "(\\d+M)";
        // if (ISO_8601_String.includes("S"))
        //     regexString += "(\\d+S)";
        // console.log(regexString)
        // let regex = new RegExp(regexString);
        // let str = ISO_8601_String.replace(regex, "$1:$2");
        // console.log(str)
        // let times = str.split(":");
        // console.log(times)
        // let seconds = 0;
        // for (let time of times) {
        //     if (time.includes("H"))
        //         seconds += 3600 * parseInt(time);
        //     else if (time.includes("M"))
        //         seconds += 60 * parseInt(time);
        //     else if (time.includes("S"))
        //         seconds += parseInt(time)
        // }
        // console.log(seconds)
    }

    return (
        <div className="App" style={{flex: "1", display: "flex", flexDirection: "column"}}>
            {/* <p>Can only get here from clicking link, not directly from url. Try setting the theme in admin and then coming back here!</p> */}
            <div>
                <button onClick={() => queryAPI("-tJYN-eG1zk")}>Play Queen</button>
                <button onClick={() => queryAPI("-cmSCQbWxV0")}>Play Kanye</button>
            </div>
            {data && <div style={{flex: "1"}}>
                <iframe src={"http://www.youtube.com/embed/" + data.id}
                    width="100%" height="100%" frameBorder="0" allowFullScreen={true} />
            </div>}
            {data && <div>Duration: {data.contentDetails.duration} | VideoID: {data.id}</div>}
        </div>
    );
};

export default LockedScreen;