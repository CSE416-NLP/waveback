import React, { useState, useEffect } from 'react';
import "../../styles/css/index.css"
import { Label, Icon } from 'semantic-ui-react'
import { getSpotifyAccessToken } from "../../data/LocalStorage.js";
import { GET_DB_PLAYLISTS } from '../../cache/queries';
import * as mutations from '../../cache/mutations';
import { flowRight as compose } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { graphql } from '@apollo/react-hoc';
import { GET_USER_PLAYLISTS } from '../../cache/mutations';

const GenerateLocationPlaylist = (props) => {
    const ObjectId = require("mongoose").Types.ObjectId;

    const { refetch } = useQuery(GET_DB_PLAYLISTS);
    const [playlists, setPlaylists] = useState([]);
    const [textHoverState, setTextHoverState] = useState(null);
    const [numSongs, setNumSongs] = useState(1);
    const [lastSongInputValid, setLastSongInputValid] = useState(true);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([
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
        { name: "Poland", id: "PL" },]);
    const [countriesQueried, setCountriesQueried] = useState([]);
    const [countriesDisplayed, setCountriesDisplayed] = useState([]);
    const [categoriesQueried, setCategoriesQueried] = useState([]);
    const [categoriesDisplayed, setCategoriesDisplayed] = useState([]);

    useEffect(() => {
        async function loadPlaylists() {
            const { data } = await props.getUserPlaylists({ variables: { owner: props.user.username } });
            setPlaylists(data.getUserPlaylists);
        }
        loadPlaylists();

        let token = getSpotifyAccessToken();
        token = "Bearer " + token;
        fetch("https://api.spotify.com/v1/browse/categories?&limit=50", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(response => response.json())
            .then(data => {
                let items = data.categories.items;
                let newGenres = [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name !== "Joe Rogan Experience") {
                        newGenres.push(items[i]);
                    }
                }
                setCategories(newGenres);
            })
        return () => {
        }
    }, [refetch]);

    const addCategory = (categoryName, id) => {
        console.log(categoryName + " " + id);
        let updateThis = true;
        let categoriesCopy = [...categoriesDisplayed];
        for (let i = 0; i < categoriesCopy.length; i++) {
            if (categoriesCopy[i].category === categoryName) { updateThis = false; }
        }
        if (updateThis) {
            categoriesCopy.push({ category: categoryName });
            setCategoriesDisplayed(categoriesCopy);
            categoriesCopy = [...categoriesQueried];
            categoriesCopy.push(id);
            setCategoriesQueried(categoriesCopy);
        }
        else {
            return;
        }
    }

    const addCountry = (country, id) => {
        let updateThis = true;
        let countryCopy = [...countriesDisplayed];
        for (let i = 0; i < countryCopy.length; i++) {
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
    }

    const removeCategory = (category) => {
        let categoriesDisplayedCopy = [...categoriesDisplayed];
        let categoriesQueriedCopy = [...categoriesQueried];

        let index = 0;
        for (let i = 0; i < categoriesDisplayedCopy.length; i++) {
            if (categoriesDisplayedCopy[i].category === category) {
                categoriesDisplayedCopy.splice(i, 1);
                categoriesQueriedCopy.splice(i, 1);
            }
        }
        setCategoriesDisplayed(categoriesDisplayedCopy);
        setCategoriesQueried(categoriesQueriedCopy);
    }

    const removeCountry = (country) => {
        let countriesDisplayedCopy = [...countriesDisplayed];
        let countriesQueriedCopy = [...countriesQueried];

        let index = 0;
        for (let i = 0; i < countriesDisplayedCopy.length; i++) {
            console.log(countriesDisplayed[i]);
            if (countriesDisplayedCopy[i].country === country) {
                countriesDisplayedCopy.splice(i, 1);
                countriesQueriedCopy.splice(i, 1);
            }
        }
        setCountriesDisplayed(countriesDisplayedCopy);
        setCountriesQueried(countriesQueriedCopy);
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
    }
    const generatePlaylist = async () => {
        let numCountries = countriesQueried.length;
        let numCategories = categoriesQueried.length;
        console.log("num of countries: " + numCountries + " num of categories: " + numCategories)
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
            visibility: props.user.defaultVisibility,
            tags: [],
            duration: 0
        }

        // RANDOMLY SELECT A SONG UNTIL WE REACH TARGET NUMBER //
        for (var i = 0; i < numSongs; i++) {
            try {
                let country = "US";
                let category = "pop";
                if (numCountries > 0) {
                    country = countriesQueried[Math.floor(Math.random() * numCountries)];
                }
                if (numCategories > 0) {
                    category = categoriesQueried[Math.floor(Math.random() * numCategories)];
                }

                let query = "https://api.spotify.com/v1/browse/categories/" + category + "/playlists?country=" + country + "&limit=50";
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
                let randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
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


    return (
        <div className="generateScreen" onMouseEnter={() => setTextHoverState(null)}>
            <div className="generateScreenTitleText">experience the sounds of...</div>
            <div className="generateScreenTopContainer">
                <div className="generateScreenTopInnerContainerLocation">
                    <h3>Countries</h3>
                    <div align="center" className="generateScreenBox">
                        <div className="generateLeftContainer">
                            <div className="ui input">
                                <input size="25" id="genreSearch" className="generateInput"
                                    style={{ backgroundColor: "var(--secondary)" }} placeholder="Filter countries..."
                                />
                            </div>
                            <div className="generateScreenButtonContainer">
                                {countries.map((country, index) => (
                                    <div className="genreButton">
                                        <button className="clickButton ui button large" onClick={() => addCountry(country.name, country.id)} onMouseEnter={() => setTextHoverState(null)}>
                                            {country.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="genreRightContainer">
                            <div className="genreRightContainerInner" onMouseEnter={() => setTextHoverState(null)}>
                                {countriesDisplayed.map((row, index) =>
                                    <div className="categoryTextContainer" onMouseEnter={() => setTextHoverState(row.country)}>
                                        <p key={index} className="genreList"><i>{row.country}</i></p>
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

                <div className="generateScreenTopInnerContainerLocation">
                    <h3>Categories</h3>
                    <div align="center" className="generateScreenBox">
                        <div className="generateLeftContainer">
                            <div className="ui input">
                                <input size="25" id="genreSearch" className="generateInput"
                                    style={{ backgroundColor: "var(--secondary)" }} placeholder="Filter categories..."
                                />
                            </div>
                            <div className="generateScreenButtonContainer">
                                {categories.map((genre, index) => (
                                    <div className="genreButton">
                                        <button className="clickButton ui button large" onClick={() => addCategory(genre.name, genre.id)} onMouseEnter={() => setTextHoverState(null)}>
                                            {genre.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="genreRightContainer">
                            <div className="genreRightContainerInner" onMouseEnter={() => setTextHoverState(null)}>
                                {categoriesDisplayed.map((row, index) =>
                                    <div className="categoryTextContainer" onMouseEnter={() => setTextHoverState(row.category)}>
                                        <p className="genreList" key={index}><i>{row.category}</i></p>
                                        <div className="removeCategoryIcon">
                                            <Icon className="large" style={{
                                                width: "3%", display: (row.category === textHoverState) ? "block" : "none"
                                            }}
                                                name="remove" onClick={() => removeCategory(row.category)}>
                                            </Icon>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="generateDividerLocation"></div>
            <div className="generateBottomArea">
                <h3>Playlist Size</h3>
                <div className="ui input maxSongInputArea">
                    <button className="ui button clickButton icon" onClick={() => changeNumSongs(numSongs - 1)}>
                        <i className="angle left icon" />
                    </button>
                    {!lastSongInputValid && <Label style={{ position: "absolute", marginTop: "4em" }} pointing='above'>Please enter a value between 1-50</Label>}
                    <input id="songNumberInput" size="1" maxLength="3" value={numSongs} style={{ backgroundColor: "var(--secondary)" }}
                        onChange={(e) => { changeNumSongs(parseInt(e.target.value)) }} />
                    <button className="clickButton ui button icon" onClick={() => changeNumSongs(numSongs + 1)}>
                        <i className="angle right icon" />
                    </button>
                </div>
                <div className="generateButtonBox">
                    <button className="clickButton ui button massive generateButton" onClick={generatePlaylist}>GENERATE!</button>
                </div>
            </div>

        </div>
    );
};

export default compose(
    graphql(mutations.ADD_PLAYLIST, { name: 'addPlaylist' }),
    graphql(GET_USER_PLAYLISTS, { name: 'getUserPlaylists' }),
    graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" })
)(GenerateLocationPlaylist);
