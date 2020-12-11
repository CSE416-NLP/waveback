import React from 'react';
import "../styles/css/index.css"
import { flowRight as compose } from 'lodash';
import { Tab } from 'semantic-ui-react';
import GenerateLocationPlaylist from './Generate/GenerateLocationPlaylist';
import GenerateHistoricalPlaylist from './Generate/GenerateHistoricalPlaylist';


const GenerateScreen = (props) => {
  const panes = [
    { menuItem: "Categorical Playlist Generator", render: () => <Tab.Pane>
      <GenerateLocationPlaylist user={props.user} fetchUser={props.fetchUser} history={props.history} />
    </Tab.Pane> },
    { menuItem: "Historical Playlist Generator", render: () => <Tab.Pane>
      <GenerateHistoricalPlaylist user={props.user} fetchUser={props.fetchUser} history={props.history} />
    </Tab.Pane> },
  ]

  return (
    <Tab className="generateTabPane" panes={panes} />
  );
};

export default compose(
)(GenerateScreen);