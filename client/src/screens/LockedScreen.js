import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

/*  This is really more of a testing file for playing around with the router 
    but maybe you guys find it interesting to look at as something that can
    be done.  */

const LockedScreen = (props) => {
    // if (!props.location.key)
    //     return <Redirect to="/" />
    const [data, setData] = useState(null);
    
    const clickHandler = (songID) => {
        // Nate's API key is AIzaSyBqoZTfsx0o7_2UBNBPKOMGRREY6Qg2wAc
        let query = "https://www.googleapis.com/youtube/v3/videos?id=" + songID +
            "&key=AIzaSyBqoZTfsx0o7_2UBNBPKOMGRREY6Qg2wAc&part=snippet,contentDetails,statistics,status"
        fetch(query, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.items[0])
                setData(data.items[0]);
            })
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
        <div className="App">
            <p>Can only get here from clicking link, not directly from url. Try setting the theme in admin and then coming back here!</p>
            <button onClick={() => clickHandler("-tJYN-eG1zk")}>Play Queen</button>
            <button onClick={() => clickHandler("-cmSCQbWxV0")}>Play Kanye</button>
            {data && <iframe src={"http://www.youtube.com/embed/" + data.id}
                width="560" height="315" frameBorder="0" allowFullScreen={true} />}
            {data && <p>Duration: {data.contentDetails.duration}</p>}
        </div>
    );
};

export default LockedScreen;