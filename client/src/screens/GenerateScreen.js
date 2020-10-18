import React, { useState } from 'react';
import "../styles/css/index.css"

const GenerateScreen = (props) => {
  const [rowState, setRows] = useState([{
    location: "",
    startYear: "",
    endYear: "",
  }]);

  const addEntryRow = () => {
    let rowCopy = [...rowState];
    rowCopy.push({
      location: "",
      startYear: "",
      endYear: "",
    });
    setRows(rowCopy);
  }

  const addInfo = (index, type, event) => {
    let rowCopy = [...rowState];
    rowCopy[index][type] = event.target.value;
    setRows(rowCopy);
  }

  return (
    <div className="generateScreen">

      <div className="generateScreenTitleText">bring back the sounds of...</div>

      <div className="generateScreenModules">
        <p className="generateScreenText">Add Locations
          <button className="addLocationButton" onClick={addEntryRow}>+</button>
        </p>
        <p align="center" className="generateScreenBox" id="gsbLeft">
          {rowState.map((row, index) =>
          <p>
            <input size="27" value={row.location} className="generateInput addLocation" onChange={(e) => addInfo(index, "location", e)} />
            <input size="6" value={row.startYear} className="generateInput addStartYear" onChange={(e) => addInfo(index, "startYear", e)} />
            <input size="6" value={row.endYear} className="generateInput addEndYear" onChange={(e) => addInfo(index, "endYear", e)} />
          </p>
          )}
        </p>
      </div>

      <div className="generateScreenModules">
        <div>
          <p className="generateScreenText">Add Genre</p>
          <p align="center" className="generateScreenBox" id="gsbRight"></p>
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