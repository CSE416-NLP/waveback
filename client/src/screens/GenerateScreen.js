import React, { useState } from 'react';
import "../styles/css/index.css"

const GenerateScreen = (props) => {
  return (
    <div class="generateScreen">

      <div class="generateScreenTitleText">bring back the sounds of...</div>

      <div class="generateScreenModules">
        <p class="generateScreenText">Add Location</p>
        <p align="center" class="generateScreenBox" id="gsbLeft"></p>
      </div>

      <div class="generateScreenModules">
        <div>
          <p class="generateScreenText">Add Genre</p>
          <p align="center" class="generateScreenBox" id="gsbRight"></p>
        </div>
        <div>
          <p class="generateScreenText">Preferred Number of Songs</p>
          <p align="center" class="generateScreenBox" id="gsbBottom"></p>
        </div>
        <button class="generateButton">GENERATE!</button>
      </div>
        
    </div>
  );
};

export default GenerateScreen;