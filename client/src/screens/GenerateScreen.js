import React, { useState, useEffect } from 'react';
import "../styles/css/index.css"
import { Label } from 'semantic-ui-react'
import { getSpotifyAccessToken } from "../data/LocalStorage.js";
import countryList from 'react-select-country-list';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import * as mutations from '../cache/mutations';
import { flowRight as compose } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { Tab } from 'semantic-ui-react';
import GenerateLocationPlaylist from './Generate/GenerateLocationPlaylist';
import GenerateHistoricalPlaylist from './Generate/GenerateHistoricalPlaylist';



const GenerateScreen = (props) => {
  const panes = [
    { menuItem: "Location Based Playlist Generator", render: () => <Tab.Pane><GenerateLocationPlaylist user={props.user} fetchUser={props.fetchUser} history={props.history} /></Tab.Pane> },
    { menuItem: "Historical Playlist Generator", render: () => <Tab.Pane><GenerateHistoricalPlaylist user={props.user} fetchUser={props.fetchUser} history={props.history} /></Tab.Pane> },
  ]

  // useEffect(() => {
  //   async function loadPlaylists() {
  //     const { data } = await props.getUserPlaylists({ variables: { owner: props.user.username } });
  //     setPlaylists(data.getUserPlaylists);
  //   }
  //   loadPlaylists();

  //   let token = getSpotifyAccessToken();
  //   token = "Bearer " + token;
  //   fetch("https://api.spotify.com/v1/browse/categories?&limit=50", {
  //     method: "GET",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": token
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       let items = data.categories.items;
  //       let newGenres = [];
  //       for (var i = 0; i < items.length; i++) {
  //         if (items[i].name !== "Joe Rogan Experience") {
  //           newGenres.push(items[i]);
  //         }
  //       }
  //       setGenres(newGenres);
  //     })
  //   return () => {
  //   }
  // }, [refetch]);

  return (
    <Tab panes={panes} />
  );
};

export default compose(
)(GenerateScreen);