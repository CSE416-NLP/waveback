import { Form, TextArea } from 'semantic-ui-react';
import React, { useState } from 'react';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { UPDATEUSERPROFILE } from '../../cache/mutations';

const stringToArray = (str) => {
    if (!str) return [];
    let splitString = str.split(",");
    let len = splitString.length;
    for (let i = 0; i < len; i++) {
        splitString[i] = splitString[i].trim();
    }
    if (splitString[len-1] === "") 
        splitString.pop();
    return splitString;
}

const arrayToString = (array) => {
    let str = "";
    for (let element of array) 
        str += element + ",";
    if (str.length >= 1 && str.charAt(str.length - 1) === ",")
        str = str.substring(0, str.length - 1);
    return str;
}

const MyProfile = (props) => {
    console.log(props);
    const currentUser = props.user
    const [bio, setBio] = useState(currentUser.bio)
    const [location, setLocation] = useState(currentUser.location)
    const [favoriteGenres, setFavoriteGenres] = useState(arrayToString(currentUser.favoriteGenres))
    const [favoriteArtists, setFavoriteArtists] = useState(arrayToString(currentUser.favoriteArtists))
    const [favoriteSongs, setFavoriteSongs] = useState(arrayToString(currentUser.favoriteSongs))

    const updateProfile = async () => {
        // Split the strings by comma separators and then remove excess whitespace (not inbetween words)
        let parsedGenres = stringToArray(favoriteGenres)
        let parsedArtists = stringToArray(favoriteArtists)
        let parsedSongs = stringToArray(favoriteSongs)

        const updated = await props.updateuserprofile({ variables: { _id: currentUser._id, bio, location, favoriteGenres: parsedGenres, favoriteArtists: parsedArtists, favoriteSongs: parsedSongs } });
        if (updated) console.log("Saved successfully");
        else console.log("Error in saving");
        props.fetchUser();
    }

    return (
        <div className="profileScreenMainContainer">
            <p className="profileScreenSubText">Bio</p>
            <Form><TextArea className="profileTextArea" rows={6} style={{ backgroundColor: "var(--secondary)" }} placeholder="Tell us about yourself"
                value={bio} onChange={(e) => setBio(e.target.value)} />
            </Form>
            <p className="profileScreenSubText">Location</p>
            <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} placeholder="Where do you call home?"
                value={location} onChange={(e) => setLocation(e.target.value)} />
            </Form>
            <p className="profileScreenSubText">Favorite Genres</p>
            <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }}
                value={favoriteGenres} onChange={(e) => setFavoriteGenres(e.target.value)} /></Form>
            <p className="profileScreenSubText">Favorite Artists</p>
            <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }}
                value={favoriteArtists} onChange={(e) => setFavoriteArtists(e.target.value)} /></Form>
            <p className="profileScreenSubText">Favorite Songs</p>
            <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }}
                value={favoriteSongs} onChange={(e) => setFavoriteSongs(e.target.value)} /></Form>
            <div className="profileScreenUpdateButton">
                <button style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} className="ui huge button" onClick={updateProfile}>Update</button>
            </div>
        </div>
    )
}
export default compose
    (graphql(UPDATEUSERPROFILE, { name: 'updateuserprofile' }))
    (MyProfile);