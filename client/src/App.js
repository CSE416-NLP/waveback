import React, { useState, useEffect } from 'react';
import { GET_DB_USER } from './cache/queries';
import { useQuery } from '@apollo/react-hooks';
import jsonData from "./TestData.json"
import { COLOR_SCHEMES } from './styles/ColorSchemes'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import GenerateScreen from './screens/GenerateScreen';
import PlaylistsScreen from './screens/PlaylistsScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LockedScreen from './screens/LockedScreen';
import ViewProfileScreen from './screens/ViewProfileScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import Navbar from './Navbar';

const App = (props) => {
  let user = null;
  const { loading, error, data, refetch } = useQuery(GET_DB_USER);

  if (error) { console.log("ERROR:\n", error); }
  if (loading) { console.log("Loading...") }
  if (data) {
    let { getCurrentUser } = data;
    if (getCurrentUser !== null) {
      user = getCurrentUser;
      console.log("user", user);
    }
  }

  useEffect(() => {
    if (user && user.theme) {
      let theme = COLOR_SCHEMES[user.theme]
      document.documentElement.style.setProperty("--primary", theme.primary);
      document.documentElement.style.setProperty("--secondary", theme.secondary);
      document.documentElement.style.setProperty("--accent", theme.accent);
      document.documentElement.style.setProperty("--background", theme.background);
      document.documentElement.style.setProperty("--hue", theme.hue);
      document.documentElement.style.setProperty("--buttonColor", theme.buttonColor);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Switch>
        <Route exact path="/welcome" render={(props) => user ? <Redirect to="/discover" /> : <SplashScreen user={user} fetchUser={refetch} />} />
        <Route exact path="/discover" render={(props) => !user ? <Redirect to="/welcome" /> : <DiscoverScreen user={user} fetchUser={refetch} />} />
        <Route exact path="/generate" render={(props) => !user ? <Redirect to="/welcome" /> : <GenerateScreen user={user} fetchUser={refetch} />} />
        <Route exact path="/playlists" render={(props) => !user ? <Redirect to="/welcome" /> : <PlaylistScreen user={user} fetchUser={refetch} />} />
        <Route exact path="/playlists/playlist/:id" component={PlaylistScreen} />
        <Route exact path="/profile" render={(props) => user ? <ProfileScreen fetchUser={refetch} user={user} {...props}/> : <Redirect to="/welcome"/>} />
        <Route exact path="/admin" component={AdminScreen} />
        <Route exact path="/test" component={LockedScreen} />
        <Route exact path="/profile/:id" component={ViewProfileScreen} />
        <Redirect from={"/:any", "/" } to={{ pathname: "/welcome" }} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
