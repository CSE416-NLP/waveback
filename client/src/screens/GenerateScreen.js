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

const GenerateScreen = (props) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  const { refetch } = useQuery(GET_DB_PLAYLISTS);
  const [playlists, setPlaylists] = useState([]);

  const [countries, setCountries] = useState([]);
  const [countryIDs, setCountryIDs] = useState([]);
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countryDisplay, setCountryDisplay] = useState([{
    country: "",
  }]);
  // const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadPlaylists() {
      const { data } = await props.getUserPlaylists({ variables: { owner: props.user.username } });
      // console.log(data);
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
        // console.log(items);
        // let genreMap = new Map();
        for (var i = 0; i < items.length; i++) {
          // genreMap.set(items[i].name, items[i].id);
          if (items[i].name !== "Joe Rogan Experience") {
            newGenres.push(items[i]);
          }
        }
        setGenres(newGenres);
      })
    // let countryObject = contryList().getLabel
    let newCountries = [
      {name: "United States", id: "US"},
      {name: "Canada", id: "CA"},
      {name: "Mexico", id: "MO"},
      {name: "Brazil", id: "BA"},
      {name: "United Kingdom", id: "UK"},
      {name: "Germany", id: "GE"},
      {name: "France", id: "FR"},
    ];
    // for (const [key, value] of Object.entries(countryList().getLabelList())) {
    //   // console.log(key.toString());
    //   // console.log(value.toString());
    //   let newCountry = {
    //     name: key.toString(),
    //     id: value.toString()
    //   }
    //   newCountries.push(newCountry);
    // }
    // console.log(newCountries);
    setCountries(newCountries);
    return () => {
    }
  }, [refetch]);
  // console.log(countries);

  // console.log(genres);

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

  // const addLocation = () => {
  //   let locationCopy = [...locationState];
  //   locationCopy.push({
  //     location: "",
  //     startYear: "",
  //     endYear: "",
  //   });
  //   setLocations(locationCopy);
  // }

  // const subtractLocation = () => {
  //   let locationCopy = [...locationState];
  //   locationCopy.pop();
  //   setLocations(locationCopy);
  // }

  // const addLocationInfo = (index, type, event) => {
  //   let rowCopy = [...locationState];
  //   rowCopy[index][type] = event.target.value;
  //   setLocations(rowCopy);
  // }

  // // Called when the user types in a genre in the input field.
  // const addNewGenre = () => {
  //   let updateThis = true;
  //   let genreCopy = [...genreState];
  //   if (genreInputState === "") { return; }
  //   for (let i = 0; i < genreCopy.length; i++) {
  //     if (genreCopy[i].genre === genreInputState) { updateThis = false; }
  //   }
  //   if (updateThis) { genreCopy.push({ genre: genreInputState }); }
  //   setGenreStates(genreCopy);
  // }

  // Called when the user selects a pre-defined genre button.
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
    console.log(country + " " + id);
    let updateThis = true;
    let countryCopy = [...countryDisplay];
    for (let i = 0; i < countryCopy.length; i++) {
      if (countryCopy[i].country === country) { updateThis = false; }
    }
    if (updateThis) { countryCopy.push({ country: country }); }
    setCountryDisplay(countryCopy);
    console.log(countryDisplay);
    countryCopy = [...countryIDs];
    countryCopy.push(id);
    setCountryIDs(countryCopy);
  }
  // const subtractGenre = () => {
  //   let genreCopy = [...genreState];
  //   genreCopy.pop();
  //   setGenreStates(genreCopy);
  // }

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

  const generatePlaylistHelper = async () => {
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
      let country = "US";
      let category = "pop";
      if (numCountries > 0) {
        country = countryIDs[Math.floor(Math.random() * numCountries)];
        // console.log(country);
      }
      if (numCategories > 0) {
        category = categoryIDs[Math.floor(Math.random() * numCategories)];
        // console.log(category);
      }

      let query = "https://api.spotify.com/v1/browse/categories/" + category + "/playlists?country=" + country + "&limit=50";
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
          // console.log(randomPlaylist);
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
    console.log(newPlaylist.songs.length);
    for (let i = 0; i < newPlaylist.songs.length; i++) {
      console.log("Test " + newPlaylist.songs[i]._id);
      if (!newPlaylist.songs[i]._id)
        newPlaylist.songs[i]._id = new ObjectId();
    }
    return newPlaylist;
  }

  const generatePlaylist = async () => {
    let newPlaylist = await generatePlaylistHelper();
    console.log(newPlaylist.songs.length);

    const { data } = await props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
    if (data.addPlaylist) {
      console.log(newPlaylist);
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

  return (
    <div className="generateScreen">
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
              <div className="countryButtonContainer">
                {countries.map((country, index) => (
                  <div className="genreButton">
                    <button className="clickButton ui button large" onClick={() => addCountry(country.name, country.id)}>{country.name}</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="genreRightContainer">
              <div className="genreRightContainerInner">
                {countryDisplay.map((row, index) =>
                  <p key={index}><i className="genreList">{row.country}</i></p>
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
              <div className="genreButtonContainer">
                {genres.map((genre, index) => (
                  <div className="genreButton">
                    <button className="clickButton ui button large" onClick={() => addGenre(genre.name, genre.id)}>{genre.name}</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="genreRightContainer">
              <div className="genreRightContainerInner">
                {genreState.map((row, index) =>
                  <p className="genreList" key={index}><i>{row.genre}</i></p>
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