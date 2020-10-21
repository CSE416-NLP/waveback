import React from 'react';
import "../styles/css/index.css"

const DiscoverScreen = (props) => {
  return (
    <div className="discoverScreen">
        <div>
          <input placeholder="Search.." className="discoverSearch"></input>
          <button type="submit" className="ui icon big button"><i className="search icon"></i></button>
        </div>
        <div>
          <div className="scrollDownButtonContainer">
            <button type="button" className="fluid ui icon button huge scrollDownButton"><i className="angle double down icon"></i></button>
          </div>
          
        </div>
    </div>
  );
};

export default DiscoverScreen;