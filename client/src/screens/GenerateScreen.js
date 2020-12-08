import React, { useState } from 'react';
import "../styles/css/index.css"
import { Label } from 'semantic-ui-react'

const GenerateScreen = (props) => {
  const [numSongs, setNumSongs] = useState(1);
  const [lastSongInputValid, setLastSongInputValid] = useState(true);
  const [locationState, setLocations] = useState([{
    location: "",
    startYear: "",
    endYear: "",
  }]);
  const [genreInputState, setGenreInputState] = useState("");
  const [genreState, setGenres] = useState([{
    genre: "",
  }]);

  const addLocation = () => {
    let locationCopy = [...locationState];
    locationCopy.push({
      location: "",
      startYear: "",
      endYear: "",
    });
    setLocations(locationCopy);
  }

  const subtractLocation = () => {
    let locationCopy = [...locationState];
    locationCopy.pop();
    setLocations(locationCopy);
  }

  const addLocationInfo = (index, type, event) => {
    let rowCopy = [...locationState];
    rowCopy[index][type] = event.target.value;
    setLocations(rowCopy);
  }

  // Called when the user types in a genre in the input field.
  const addNewGenre = () => {
    let updateThis = true;
    let genreCopy = [...genreState];
    if (genreInputState === "") { return; }
    for (let i = 0; i < genreCopy.length; i++) {
      if (genreCopy[i].genre === genreInputState) {updateThis = false; }
    }
    if (updateThis) { genreCopy.push({genre: genreInputState}); }
    setGenres(genreCopy);
  }

  // Called when the user selects a pre-defined genre button.
  const addGenre = (genreName) => {
    let updateThis = true;
    let genreCopy = [...genreState];
    for (let i = 0; i < genreCopy.length; i++) {
      if (genreCopy[i].genre === genreName) {updateThis = false; }
    }
    if (updateThis) { genreCopy.push({genre: genreName}); }
    setGenres(genreCopy);
  }

  const subtractGenre = () => {
    let genreCopy = [...genreState];
    genreCopy.pop();
    setGenres(genreCopy);
  }

  const changeNumSongs = (num) => {
    if (isNaN(num)) {
      setNumSongs("");
      setLastSongInputValid(false)
    } 
    else if (num > 0 && num < 100) {
      setNumSongs(parseInt(num))
      setLastSongInputValid(true)
    }
    else {
      setLastSongInputValid(false)
    }
  }

  return (
    <div className="generateScreen">
      <div className="generateScreenTitleText">bring back the sounds of...</div>
      <div className="generateScreenTopContainer">
        <div className="generateScreenTopInnerContainer">
          <div className="generateAddSubtractButtons">
            <h3>Locations</h3>
            <div className="generateBoxLabel">
              <button className="clickButton ui icon button generateSquareButton" onClick={addLocation}>
                <i className="plus circle icon"></i>
              </button>
              <button style={{color: "var(--background)"}} className="ui grey icon button generateSquareButton" onClick={subtractLocation}>
                <i className="minus circle icon"></i>
              </button>
            </div> 
          </div>
          <div align="center" className="generateScreenBoxLeft">
            <div className="generateSubText">
              <i id="lt1">Location</i><i id="lt2">Year Start</i><i id="lt3">Year End</i>
            </div>
            <div className="locationScroller">
              {locationState.map((row, index) =>
                <div className="locationInfoRow" key={index}>
                  <div className="ui input">
                    <input value={row.location} className="generateInput" style={{backgroundColor: "var(--secondary)"}} 
                      onChange={(e) => addLocationInfo(index, "location", e)} />
                  </div>
                  <div className="ui input">
                    <input maxLength="4" value={row.startYear} className="generateInputSmall" style={{backgroundColor: "var(--secondary)"}} 
                      onChange={(e) => addLocationInfo(index, "startYear", e)} />
                  </div>
                  <div className="ui input">
                    <input maxLength="4" value={row.endYear} className="generateInputSmall" style={{backgroundColor: "var(--secondary)"}} 
                      onChange={(e) => addLocationInfo(index, "endYear", e)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="generateScreenTopInnerContainer">
          <div className="generateAddSubtractButtons">
            <h3>Genres</h3>
            <div className="generateBoxLabel">
              <button className="clickButton ui icon button generateSquareButton" onClick={addNewGenre}>
                <i className="plus circle icon"></i>
              </button>
              <button style={{color: "var(--background)"}} className="ui grey icon button generateSquareButton" onClick={subtractGenre}>
                <i className="minus circle icon"></i>
              </button>
            </div> 
          </div>
          <div align="center" className="generateScreenBoxRight">
            <div className="genreLeftContainer">
              <div className="generateSubText"><i id="gt1">Search for Genre</i></div>
              <div className="ui input">
                <input size="20" id="genreSearch" className="generateInputGenre" onChange={(e) => setGenreInputState(e.target.value)}
                  style={{backgroundColor: "var(--secondary)"}} 
                />
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("Top Lists")}>Top Lists</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Pop")}>Pop</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Indie")}>Indie</button>
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("Mood")}>Mood</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Rock")}>Rock</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Hip-Hop")}>Hip-Hop</button>
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("Party")}>Party</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Chill")}>Chill</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Workout")}>Workout</button>
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("Instrumental")}>Instrumental</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Focus")}>Focus</button>
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("At Home")}>At Home</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Dance/Electronic")}>Dance/Electronic</button>
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("R&B")}>R&amp;B</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Metal")}>Metal</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Romance")}>Romance</button>
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("Decades")}>Decades</button>
                <button className="clickButton ui button tiny" onClick={() => addGenre("Wellness")}>Wellness</button>
              </div>
              <div className="genreButton">
                <button className="clickButton ui button tiny" onClick={() => addGenre("Gaming")}>Gaming</button>
              </div>
            </div>
            <div className="genreRightContainer">
              {genreState.map((row, index) =>
                <p key={index}><i className="genreList">{row.genre}</i></p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="generateDivider"></div>

      <div className="generateBottomArea">
          <h3>Playlist Size</h3>
          <div className="ui input maxSongInputArea">
            <button className="ui button grey icon" onClick={() => changeNumSongs(numSongs - 1)}>
              <i className="angle left icon"/>
            </button>
              {!lastSongInputValid && <Label style={{position: "absolute", marginTop: "4em"}} pointing='above'>Please enter a value between 1-99</Label>}
              <input id="songNumberInput" size="1" maxLength="3" value={numSongs} style={{backgroundColor: "var(--secondary)"}}
                onChange={(e) => { changeNumSongs(parseInt(e.target.value)) }} />
            <button className="ui button grey icon" onClick={() => changeNumSongs(numSongs + 1)}>
              <i className="angle right icon"/>
            </button>
          </div>
          <div className="generateButtonBox">
            <button className="clickButton ui button massive generateButton">GENERATE!</button>
          </div>
        </div>

    </div>
  );
};

export default GenerateScreen;