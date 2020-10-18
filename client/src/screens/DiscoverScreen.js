import React, { useState } from 'react';
import "../styles/css/index.css"

const DiscoverScreen = (props) => {
  return (
    <div className="discoverScreen">
        <div>
          <input type="text" placeholder="Search.." className="discoverSearch"></input>
          <button type="submit" className="discoverSearch">{'>'}</button>
        </div>
        <div>
          <button type="button" className="scrollDownButton">v</button>
          
        </div>
    </div>
  );
};

export default DiscoverScreen;