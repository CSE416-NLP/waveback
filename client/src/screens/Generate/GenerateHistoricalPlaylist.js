import React, { useState, useEffect } from 'react';
import "../../styles/css/index.css"
import { Label, Icon, StepDescription } from 'semantic-ui-react'
import { getSpotifyAccessToken } from "../../data/LocalStorage.js";
import { GET_DB_PLAYLISTS } from '../../cache/queries';
import * as mutations from '../../cache/mutations';
import { flowRight as compose } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { graphql } from '@apollo/react-hoc';
import { GET_USER_PLAYLISTS } from '../../cache/mutations';

const GenerateHistoricalPlaylist = (props) => {
    const ObjectId = require("mongoose").Types.ObjectId;

    const { refetch } = useQuery(GET_DB_PLAYLISTS);
    const [playlists, setPlaylists] = useState([]);
    const [textHoverState, setTextHoverState] = useState(null);
    const [numSongs, setNumSongs] = useState(10);
    const [lastSongInputValid, setLastSongInputValid] = useState(true);
    const decades = ["1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
    const [countriesQueried, setCountriesQueried] = useState([]);
    const [countriesDisplayed, setCountriesDisplayed] = useState([]);
    const [decadesQueried, setDecadesQueried] = useState([]);
    const countries = [
        { name: "United States", id: "US" },
        { name: "United Kingdom", id: "GB" },
        { name: "Mexico", id: "MO" },
        { name: "Germany", id: "GE" },
        { name: "Brazil", id: "BA" },
        { name: "Canada", id: "CA" },
        { name: "Australia", id: "AU" },
        { name: "Netherlands", id: "NL" },
        { name: "France", id: "FR" },
        { name: "Sweden", id: "SE" },
        { name: "Spain", id: "ES" },
        { name: "Italy", id: "IT" },
        { name: "Philippines", id: "PH" },
        { name: "Argentina", id: "AR" },
        { name: "Norway", id: "NO" },
        { name: "Chile", id: "CL" },
        { name: "Denmark", id: "DK" },
        { name: "New Zealand", id: "NZ" },
        { name: "Finland", id: "FI" },
        { name: "Poland", id: "PL" },];
    const [errorMsg, setErrorMsg] = useState("");
    const [decadeFilter, setDecadeFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadPlaylists() {
            const { data } = await props.getUserPlaylists({ variables: { owner: props.user.username } });
            setPlaylists(data.getUserPlaylists);
        }
        loadPlaylists();
    }, [refetch]);

    const addDecade = (decade) => {
        console.log(decade);
        let updateThis = true;
        let decadeCopy = [...decadesQueried];
        for (let i = 0; i < decadeCopy.length; i++) {
            if (decadeCopy[i].decade === decade) { updateThis = false; }
        }
        if (updateThis) {
            decadeCopy.push({ decade });
            setDecadesQueried(decadeCopy);
        }
        else {
            return;
        }
        setErrorMsg("");
    }

    const addCountry = (country, id) => {
        let updateThis = true;
        let countryCopy = [...countriesDisplayed];
        console.log(countryCopy);
        for (let i = 0; i < countryCopy.length; i++) {
            console.log(countryCopy[i] + " " + country);
            if (countryCopy[i].country === country) { updateThis = false; }
        }
        if (updateThis) {
            countryCopy.push({ country });
            setCountriesDisplayed(countryCopy);
            countryCopy = [...countriesQueried];
            countryCopy.push(id);
            setCountriesQueried(countryCopy);
        }
        else {
            return;
        }
        setErrorMsg("");
    }

    const removeDecade = (decade) => {
        let decadeCopy = [...decadesQueried];
        for (let i = 0; i < decadeCopy.length; i++) {
            if (decadeCopy[i].decade === decade) {
                decadeCopy.splice(i, 1);
            }
        }
        setDecadesQueried(decadeCopy);
        setErrorMsg("");
    }

    const removeCountry = (country) => {
        let countriesDisplayedCopy = [...countriesDisplayed];
        let countriesQueriedCopy = [...countriesQueried];

        for (let i = 0; i < countriesDisplayedCopy.length; i++) {
            console.log(countriesDisplayed[i]);
            if (countriesDisplayedCopy[i].country === country) {
                countriesDisplayedCopy.splice(i, 1);
                countriesQueriedCopy.splice(i, 1);
            }
        }
        setCountriesDisplayed(countriesDisplayedCopy);
        setCountriesQueried(countriesQueriedCopy);
        setErrorMsg("");
    }

    const changeNumSongs = (num) => {
        if (isNaN(num)) {
            setNumSongs("");
            setLastSongInputValid(false)
        }
        else if (num > 0 && num < 51) {
            setNumSongs(parseInt(num))
            setLastSongInputValid(true)
        }
        else {
            setLastSongInputValid(false)
        }
        setErrorMsg("");
    }

    const generatePlaylist = async () => {
        setLoading(true);
        let numCountries = countriesQueried.length;
        let numDecades = decadesQueried.length;
        console.log("num of countries: " + numCountries + " num of decades: " + numDecades)
        let token = getSpotifyAccessToken();
        token = "Bearer " + token;

        let newPlaylist = {
            key: playlists.length,
            owner: props.user.username,
            name: "Unnamed Playlist",
            picture: "http://copywritingcourse.com/wp-content/uploads/blank-cd-icon.png",
            description: "",
            songs: [],
            songURIs: [],
            followers: 0,
            visibility: props.user ? props.user.defaultVisibility : "Public",
            tags: [],
            duration: 0
        }

        // RANDOMLY SELECT A SONG UNTIL WE REACH TARGET NUMBER //
        for (var i = 0; i < numSongs; i++) {
            try {
                let country = "US";
                let decade = "2010s";
                if (numCountries > 0) {
                    country = countriesQueried[Math.floor(Math.random() * numCountries)];
                }
                if (numDecades > 0) {
                    decade = decadesQueried[Math.floor(Math.random() * numDecades)];
                }

                let query = "https://api.spotify.com/v1/search?q=" + decade + "&type=playlist&market=" + country;
                let response = await fetch(query, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })
                const data = await response.json()
                let playlists = data.playlists.items;
                let randomPlaylist = playlists[playlists.length < 3 ? playlists.length : Math.floor(Math.random() * 3)];
                let playlistID = randomPlaylist.id;
                let playlistQuery = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";

                response = await fetch(playlistQuery, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })
                const songData = await response.json()

                let randomSongIndex = Math.floor(Math.random() * songData.items.length);
                let randomSong = songData.items[randomSongIndex].track;
                let newSong = {
                    _id: "",
                    songURI: randomSong.uri,
                    key: newPlaylist.songs.length,
                    title: randomSong.name,
                    artist: randomSong.artists[0].name,
                    album: randomSong.album.name,
                    albumPicture: randomSong.album.images[0].url,
                    genre: [],
                    year: randomSong.album.release_date ? parseInt(randomSong.album.release_date.substring(0, 4)) : null,
                    duration: Math.round(randomSong.duration_ms / 1000),
                }
                newPlaylist.songs.push(newSong);
                newPlaylist.songURIs.push(newSong.songURI);
            }
            catch (err) {
                console.error(err.message)
            }
        }
        for (let i = 0; i < newPlaylist.songs.length; i++) {
            if (!newPlaylist.songs[i]._id)
                newPlaylist.songs[i]._id = new ObjectId();
        }
        console.log(newPlaylist);
        if (newPlaylist.songs.length > 0) {
            const { data } = await props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
            if (data.addPlaylist) {
                props.history.push({
                    pathname: '/playlist/' + newPlaylist.owner + "/" + data.addPlaylist,
                    playlist: {
                        _id: data.addPlaylist,
                        ...newPlaylist
                    },
                    refreshList: refetch
                })
            }
        }
        else {
            setErrorMsg("Could not generate a playlist with the specified parameters");
        }
        setLoading(false);
    }


    return (
        <div className="generateScreen">
            <div className="generateScreenTitleText">bring back the sounds of...</div>
            <div className="generateScreenTopContainer">
                <div className="generateScreenTopInnerContainerDate">
                    <h3>Countries</h3>
                    <div align="center" className="generateScreenBox">
                        <div className="generateLeftContainer">
                            <div className="ui input">
                                <input size="25" id="genreSearch" className="generateInput"
                                    style={{ backgroundColor: "var(--secondary)" }} placeholder="Filter countries..."
                                    value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}
                                />
                            </div>
                            <div className="generateScreenButtonContainer">
                                {countries.filter(country => country.name.toLowerCase().substring(0, countryFilter.length).includes(countryFilter.toLowerCase())).map((country, index) => (
                                    <div className="genreButton" key={index}>
                                        <button className={loading ? "clickButton ui button icon disabled" : "clickButton ui button icon"} onClick={() => addCountry(country.name, country.id)}>
                                            {country.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="genreRightContainer">
                            <div className="genreRightContainerInner">
                                {countriesDisplayed.map((row, index) =>
                                    <div className="categoryTextContainer" key={index} onMouseEnter={() => {if (!loading) setTextHoverState(row.country)}} onMouseLeave={() => setTextHoverState(null)}>
                                        <p className="genreList"><i>{row.country}</i></p>
                                        <div className="removeCategoryIcon">
                                            <Icon className="large" style={{
                                                width: "3%", display: (row.country === textHoverState) ? "block" : "none"
                                            }}
                                                name="remove" onClick={() => removeCountry(row.country)}>
                                            </Icon>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="generateScreenTopInnerContainerDate">
                    <h3>Decades</h3>
                    <div align="center" className="generateScreenBox">
                        <div className="generateLeftContainer">
                            <div className="ui input">
                                <input size="25" id="genreSearch" className="generateInput"
                                    style={{ backgroundColor: "var(--secondary)" }} placeholder="Filter decades..."
                                    value={decadeFilter} onChange={(e) => setDecadeFilter(e.target.value)}
                                />
                            </div>
                            <div className="generateScreenButtonContainer">
                                {decades.filter(decade => decade.toLowerCase().substring(0, decadeFilter.length).includes(decadeFilter.toLowerCase())).map((decade, index) => (
                                    <div className="genreButton" key={index}>
                                        <button className={loading ? "clickButton ui button icon disabled" : "clickButton ui button icon"} onClick={() => addDecade(decade)}>
                                            {decade}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="genreRightContainer">
                            <div className="genreRightContainerInner">
                                {decadesQueried.map((row, index) =>
                                    <div className="categoryTextContainer" key={index} onMouseEnter={() => {if (!loading) setTextHoverState(row.decade)}} onMouseLeave={() => setTextHoverState(null)}>
                                        <p className="genreList" key={index}><i>{row.decade}</i></p>
                                        <div className="removeCategoryIcon">
                                            <Icon className="large" style={{
                                                width: "3%", display: (row.decade === textHoverState) ? "block" : "none"
                                            }}
                                                name="remove" onClick={() => removeDecade(row.decade)}>
                                            </Icon>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="generateDividerDate"></div> */}
            <div className="generateBottomArea">
                <h3>Playlist Size</h3>
                <div className="ui input maxSongInputArea">
                    <button className={loading ? "clickButton ui button icon disabled" : "clickButton ui button icon"} onClick={() => changeNumSongs(numSongs - 1)}>
                        <i className="angle left icon" />
                    </button>
                    {!lastSongInputValid && <Label style={{ position: "absolute", marginTop: "4em" }} pointing='above'>Please enter a value between 1-50</Label>}
                    <input id="songNumberInput" disabled={loading ? true : false} size="1"  maxLength="3" value={numSongs} style={{ backgroundColor: "var(--secondary)" }}
                        onChange={(e) => changeNumSongs(parseInt(e.target.value))} />
                    <button className={loading ? "clickButton ui button icon disabled" : "clickButton ui button icon"} onClick={() => changeNumSongs(numSongs + 1)}>
                        <i className="angle right icon" />
                    </button>
                </div>
                <div className="generateButtonBox">
                    <button className={loading ? "clickButton ui button massive generateButton loading disabled" : "clickButton ui button massive generateButton"} onClick={generatePlaylist}>GENERATE!</button>
                    {errorMsg && <div style={{ color: "red", marginTop: "10px", fontSize: "12pt", fontWeight: "bold" }}>{errorMsg}</div>}
                </div>
            </div>

        </div>
    );
};

export default compose(
    graphql(mutations.ADD_PLAYLIST, { name: 'addPlaylist' }),
    graphql(GET_USER_PLAYLISTS, { name: 'getUserPlaylists' }),
    graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" })
)(GenerateHistoricalPlaylist);
