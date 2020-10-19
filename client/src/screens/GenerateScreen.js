import React, { useState } from 'react';
import { VscDiffAdded, VscDiffRemoved } from "react-icons/vsc";
import "../styles/css/index.css"

const GenerateScreen = (props) => {

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

  const addGenre = () => {
    let genreCopy = [...genreState];
    genreCopy.push({
      genre: "",
    });
    setGenres(genreCopy);
  }

  const subtractGenre = () => {
    let genreCopy = [...genreState];
    genreCopy.pop();
    setGenres(genreCopy);
  }

  return (
    <div className="generateScreen">

      <div className="generateScreenTitleText">bring back the sounds of...</div>

      <div className="generateScreenModules">
        <p className="generateScreenText">Locations
          <button className="generateSquareButton" onClick={addLocation}><VscDiffAdded /></button>
          <button className="generateSquareButton" onClick={subtractLocation}><VscDiffRemoved /></button>
        </p>
        <div align="center" className="generateScreenBox" id="gsbLeft">
          <div className="generateLeftScroller">
            <i id="locationText1">Location</i><i id="locationText2">Year Start</i><i id="locationText3">Year End</i>
            {locationState.map((row, index) =>
            <p key={index}>
              <input size="33" value={row.location} className="generateInput" onChange={(e) => addLocationInfo(index, "location", e)} />
              <input size="3"  maxLength="4" value={row.startYear} className="generateInput" onChange={(e) => addLocationInfo(index, "startYear", e)} />
              <input size="3" maxLength="4" value={row.endYear} className="generateInput" onChange={(e) => addLocationInfo(index, "endYear", e)} />
            </p>
            )}
          </div> 
        </div>
      </div>

      <div className="generateScreenModules">
        <div>
          <p className="generateScreenText">Genres
            <button className="generateSquareButton" onClick={addGenre}><VscDiffAdded /></button>
            <button className="generateSquareButton" onClick={subtractGenre}><VscDiffRemoved /></button>
          </p>

          <div align="center" className="generateScreenBox" id="gsbRight">
            <div align="center" className="generateScreenLine" id="gsbRightVert"></div>

            <p className="genreLeft">
              <i id="genreText1">Search for Genre</i>
              <br></br><br></br>
              <input size="20" className="generateInputGenre" />
            </p>

            <div className="generateRightScroller">
              {genreState.map((row, index) =>
              <p key={index}>
                  <i className="genreList">beter zeng</i>
              </p>
              )}
            </div>

          </div>
        </div>


        <div>
          <p className="generateScreenText">Preferred Number of Songs</p>
          <p align="center" className="generateScreenBox" id="gsbBottom"></p>
        </div>

        <button className="generateButton">GENERATE!</button>

      </div>
        
    </div>
  );
};

export default GenerateScreen;