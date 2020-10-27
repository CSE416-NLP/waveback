import React, { useState } from 'react';
import "../styles/css/index.css"
import { Label } from 'semantic-ui-react'

var buttonStyle = {color: "var(--background)", backgroundColor: "var(--buttonColor"};

const GenerateScreen = (props) => {
  const [numSongs, setNumSongs] = useState(1);
  const [lastSongInputValid, setLastSongInputValid] = useState(true);
  const [locationState, setLocations] = useState([{
    location: "",
    startYear: "",
    endYear: "",
  }]);
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

  const addNewGenre = () => {
    let genreCopy = [...genreState];
    if (document.getElementById("genreSearch").value.length > 0) {
      genreCopy.push({
        genre: document.getElementById("genreSearch").value,
      });
    }
    setGenres(genreCopy);
  }

  const addGenre = (genreName) => {
    let genreCopy = [...genreState];
    genreCopy.push({genre: genreName});
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
    <div className="generateScreen" style={{backgroundColor: "var(--background)"}}>
      <div className="generateScreenTitleText" style={{color: "var(--accent)", textShadow: "3px 3px 0px var(--secondary)"}}>bring back the sounds of...</div>

      <div className="generateScreenModules" style={{backgroundColor: "var(--background)"}}>
        <p className="generateScreenText">Locations
          <button style={buttonStyle} className="ui icon button generateSquareButton" onClick={addLocation}>
            <i className="plus circle icon"></i>
          </button>
          <button style={{color: "var(--background)"}} className="ui grey icon button generateSquareButton" onClick={subtractLocation}>
            <i className="minus circle icon"></i>
          </button>
        </p>
        <div align="center" className="generateScreenBox" id="gsbLeft" style={{backgroundColor: "var(--background)"}}>
          <i id="locationText1">Location</i><i id="locationText2">Year Start</i><i id="locationText3">Year End</i>
          <div className="generateLeftScroller">
            {locationState.map((row, index) =>
              <div key={index}>
                <div className="ui input">
                  <input size="32" value={row.location} className="generateInput" style={{backgroundColor: "var(--secondary)"}} 
                    onChange={(e) => addLocationInfo(index, "location", e)} />
                </div>
                <div className="ui input">
                  <input size="4" maxLength="4" value={row.startYear} className="generateInput" style={{backgroundColor: "var(--secondary)"}} 
                    onChange={(e) => addLocationInfo(index, "startYear", e)} />
                </div>
                <div className="ui input">
                  <input size="4" maxLength="4" value={row.endYear} className="generateInput" style={{backgroundColor: "var(--secondary)"}} 
                    onChange={(e) => addLocationInfo(index, "endYear", e)} />
                </div>
                <br></br><br></br>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="generateScreenModules" style={{backgroundColor: "var(--background)"}}>
        <div>
          <p className="generateScreenText">Genres
          <button style={buttonStyle} className="ui icon button generateSquareButton" onClick={addNewGenre}>
            <i className="plus circle icon"></i>
          </button>
            <button style={{color: "var(--background)"}} className="ui icon grey button generateSquareButton" onClick={subtractGenre}>
              <i className="minus circle icon"></i>
            </button>
          </p>
          <div align="center" className="generateScreenBox" id="gsbRight" style={{backgroundColor: "var(--background)"}}>
            <div className="genreLeft">
              <i id="genreText1">Search for Genre</i>
              <div className="ui input"><input size="20" id="genreSearch" className="generateInputGenre" style={{backgroundColor: "var(--secondary)"}}/></div>
              <div className="genreButton">
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Pop")}>Pop</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Rap")}>Rap</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("R&B")}>R&amp;B</button>
              </div>
              <div className="genreButton">
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Electronic")}>Electronic</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Alternative")}>Alternative</button>
              </div>
              <div className="genreButton">
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Rock")}>Rock</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Indie")}>Indie</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Jazz")}>Jazz</button>
              </div>
              <div className="genreButton">
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Country")}>Country</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Soul")}>Soul</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Folk")}>Folk</button>
              </div>
              <div className="genreButton">
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Classical")}>Classical</button>
                <button style={buttonStyle} className="ui button small" onClick={() => addGenre("Ambient")}>Ambient</button>
              </div>

            </div>
            <div className="generateRightScroller">
              {genreState.map((row, index) =>
                <p key={index}>
                  <i className="genreList">{row.genre}</i>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="generateDivider">
        <div className="ui divider"></div>
      </div>

      <div className="generateBottomArea">
          <p className="generateScreenText">Playlist Size</p>
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
            <button style={buttonStyle}  className="ui button massive generateButton">GENERATE!</button>
          </div>
        </div>

    </div>
  );
};

export default GenerateScreen;