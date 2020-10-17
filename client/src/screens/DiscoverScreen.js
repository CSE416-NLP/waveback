import React, { useState } from 'react';
import "../styles/css/index.css"

const DiscoverScreen = (props) => {
  return (
    <div class="discoverScreen">
        <div>
          <input type="text" placeholder="Search.." class="discoverSearch"></input>
          <button type="submit" class="discoverSearch">{'>'}</button>
        </div>
        <div>
          <button type="button" class="scrollDownButton">v</button>
          
        </div>
    </div>
  );
};

export default DiscoverScreen;