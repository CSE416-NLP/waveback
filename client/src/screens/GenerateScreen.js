import React, { useState, useEffect } from 'react';
import "../styles/css/index.css"
import { Label } from 'semantic-ui-react'
import { getSpotifyAccessToken } from "../data/LocalStorage.js";
import countryList from 'react-select-country-list';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import * as mutations from '../cache/mutations';
import { flowRight as compose } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { graphql } from '@apollo/react-hoc';
import { GET_USER_PLAYLISTS } from '../cache/mutations';
import { Icon } from 'semantic-ui-react';

const GenerateScreen = (props) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  const { refetch } = useQuery(GET_DB_PLAYLISTS);
  const [playlists, setPlaylists] = useState([]);
  const [textHoverState, setTextHoverState] = useState(null);
  const [countries, setCountries] = useState([{ name: "United States", id: "US" },
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
  const [countryIDs, setCountryIDs] = useState([]);
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countryDisplay, setCountryDisplay] = useState([]);
  const [decades, setDecades] = useState(["1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]);
  const [decadeQuery, setDecadeQuery] = useState([]);

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
        setGenres(newGenres);
      })
    return () => {
    }
  }, [refetch]);

  const [numSongs, setNumSongs] = useState(1);
  const [lastSongInputValid, setLastSongInputValid] = useState(true);
  const [locationState, setLocations] = useState([{
    location: "",
    startYear: "",
    endYear: "",
  }]);
  const [genreInputState, setGenreInputState] = useState("");
  const [genreState, setGenreStates] = useState([{
    genre: "",
  }]);

  const addGenre = (genreName, id) => {
    let updateThis = true;
    let genreCopy = [...genreState];
    for (let i = 0; i < genreCopy.length; i++) {
      if (genreCopy[i].genre === genreName) { updateThis = false; }
    }
    if (updateThis) { genreCopy.push({ genre: genreName }); }
    setGenreStates(genreCopy);
    genreCopy = [...categoryIDs];
    genreCopy.push(id);
    setCategoryIDs(genreCopy);
  }

  const addCountry = (country, id) => {
    // console.log(country + " " + id);
    let updateThis = true;
    let countryCopy = [...countryDisplay];
    for (let i = 0; i < countryCopy.length; i++) {
      if (countryCopy[i].country === country) { updateThis = false; }
    }
    if (updateThis) { countryCopy.push({ country: country }); }
    setCountryDisplay(countryCopy);
    // console.log(countryDisplay);
    countryCopy = [...countryIDs];
    countryCopy.push(id);
    setCountryIDs(countryCopy);
  }

  const addDecade = (decade) => {
    let updateThis = true;
    let decadeCopy = [...decadeQuery];
    let index = 0;
    for (let i = 0; i < decadeCopy.length; i++) {
      if (decadeCopy[i] === decade) { updateThis = false; }
    }
    if (updateThis) { decadeCopy.push(decade); }
    setDecadeQuery(decadeCopy);
  }

  const removeGenre = (genreName) => {
    let genreCopy = [...genreState];
    let index = 0;
    for (let i = 0; i < genreCopy.length; i++) {
      if (genreCopy[i]["genre"] === genreName) { index = i; }
    }
    genreCopy.splice(index, 1);
    setGenreStates(genreCopy);
  }

  const removeCountry = (countryName) => {
    let countryCopy = [...countryDisplay];
    let index = 0;
    for (let i = 0; i < countryCopy.length; i++) {
      if (countryCopy[i]["country"] === countryName) { index = i; }
    }
    countryCopy.splice(index, 1);
    setCountryDisplay(countryCopy);
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

  // const generatePlaylistHelper = async () => {

  // }

  const generatePlaylist = async () => {
    let numCountries = countryIDs.length;
    let numCategories = categoryIDs.length;
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
        country = countryIDs[Math.floor(Math.random() * numCountries)];
      }
      if (numCategories > 0) {
        category = categoryIDs[Math.floor(Math.random() * numCategories)];
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
      // console.log(randomSong);
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
        // __typename: "Song",
      }
      newPlaylist.songs.push(newSong);
      newPlaylist.songURIs.push(newSong.songURI);
    }
    catch(err) {
      console.error(err.message)
    }
      // console.log(data);
    }
    // console.log(newPlaylist);
    // console.log(newPlaylist.songs.length);
    for (let i = 0; i < newPlaylist.songs.length; i++) {
      console.log("Test " + newPlaylist.songs[i]._id);
      if (!newPlaylist.songs[i]._id)
        newPlaylist.songs[i]._id = new ObjectId();
    }
    console.log(newPlaylist.songs);
    // console.log(newPlaylist.songs.length);

    const { data } = await props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
    if (data.addPlaylist) {
      // console.log(newPlaylist);
      // console.log(props.user.username);
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

  const generateHistoricalPlaylist = async () => {
    let numCountries = countryIDs.length;
    let numDecades = decadeQuery.length;
    console.log("num of countries: " + numCountries + " num of categories: " + numDecades)
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

    for (var i = 0; i < numSongs; i++) {
      let country = "US";
      let decade = "2020s";
      if (numCountries > 0) {
        country = countryIDs[Math.floor(Math.random() * numCountries)];
      }
      if (numDecades > 0) {
        decade = categoryIDs[Math.floor(Math.random() * numDecades)];
      }

      let query = "https://api.spotify.com/v1/search?q=" + decade + "&type=playlist&market=" + country;
      fetch(query, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
        .then(response => response.json()
        )
        .then(data => {
          let playlists = data.playlists.items;
          let randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
          let playlistID = randomPlaylist.id;
          let playlistQuery = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";

          fetch(playlistQuery, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": token
            }
          }).then(response => response.json())
            .then(data => {
              let randomSongIndex = Math.floor(Math.random() * data.items.length);
              let randomSong = data.items[randomSongIndex].track;
              // console.log(randomSong);
              let newSong = {
                _id: "",
                songURI: randomSong.uri,
                key: newPlaylist.songs.length,
                title: randomSong.name,
                artist: randomSong.artists[0].name,
                album: randomSong.album.name,
                albumPicture: randomSong.album.images[0].url,
                genre: [],
                year: parseInt(randomSong.album.release_date.substring(0, 4)),
                duration: Math.round(randomSong.duration_ms / 1000),
                // __typename: "Song",
              }
              newPlaylist.songs.push(newSong);
              newPlaylist.songURIs.push(newSong.songURI);
              // console.log(data);
            })
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    // console.log(newPlaylist);
    // console.log(newPlaylist.songs.length);
    for (let i = 0; i < newPlaylist.songs.length; i++) {
      console.log("Test " + newPlaylist.songs[i]._id);
      if (!newPlaylist.songs[i]._id)
        newPlaylist.songs[i]._id = new ObjectId();
    }
    console.log(newPlaylist);

    return newPlaylist;
  }

  return (
    <div className="generateScreen" onMouseEnter={() => setTextHoverState(null)}>
      <div className="generateScreenTitleText">experience the sounds of...</div>
      <div className="generateScreenTopContainer">
        <div className="generateScreenTopInnerContainer">
          <h3>Countries</h3>
          <div align="center" className="generateScreenBox">
            <div className="generateLeftContainer">
              <div className="generateTopCountries">
              </div>
              <div className="ui input">
                <input size="25" id="genreSearch" className="generateInput" onChange={(e) => setGenreInputState(e.target.value)}
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
                {countryDisplay.map((row, index) =>
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

        <div className="generateScreenTopInnerContainer">
          <h3>Categories</h3>
          <div align="center" className="generateScreenBox">
            <div className="generateLeftContainer">
              <div className="ui input">
                <input size="25" id="genreSearch" className="generateInput" onChange={(e) => setGenreInputState(e.target.value)}
                  style={{ backgroundColor: "var(--secondary)" }} placeholder="Filter categories..."
                />
              </div>
              <div className="generateScreenButtonContainer">
                {genres.map((genre, index) => (
                  <div className="genreButton">
                    <button className="clickButton ui button large" onClick={() => addGenre(genre.name, genre.id)} onMouseEnter={() => setTextHoverState(null)}>
                      {genre.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="genreRightContainer">
              <div className="genreRightContainerInner" onMouseEnter={() => setTextHoverState(null)}>
                {genreState.map((row, index) =>
                  <div className="categoryTextContainer" onMouseEnter={() => setTextHoverState(row.genre)}>
                    <p className="genreList" key={index}><i>{row.genre}</i></p>
                    <div className="removeCategoryIcon">
                      <Icon className="large" style={{
                        width: "3%", display: (row.genre === textHoverState) ? "block" : "none"
                      }}
                        name="remove" onClick={() => removeGenre(row.genre)}>
                      </Icon>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="generateDivider"></div>
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
)(GenerateScreen);