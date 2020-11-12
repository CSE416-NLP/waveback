import React, { useEffect, useState } from 'react';
import { GET_DB_USER } from './cache/queries';
import { useQuery } from '@apollo/react-hooks';
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
import PlayerScreen from './PlayerScreen';
import { getSpotifyAccess, getSpotifyAccessToken, getSpotifyTokenExpirationTime } from "./LocalStorage";


const App = (props) => {

  let user = null;
  const { loading, error, data, refetch } = useQuery(GET_DB_USER);

  if (error) { console.log("ERROR:\n", error); }
  if (loading) { console.log("Loading...") }
  if (data) {
    let { getCurrentUser } = data;
    if (getCurrentUser !== null) {
      user = getCurrentUser;
    }
  }

  const [spotifyToken, setSpotifyToken] = useState(getSpotifyAccess() === "allowed" && getSpotifyTokenExpirationTime() > new Date().getTime() ? getSpotifyAccessToken() : null)
  const [playerVisible, setPlayerVisible] = useState(null)
  const [tracks, setTracks] = useState(['spotify:track:5yK37zazHUe3WxEvymZs20', "spotify:track:46OFHBw45fNi7QNjSetITR", "spotify:track:2LiDZmGERLzjrtBTCofj2G"])

  const authorizeSpotifyFromStorage = (e) => {
    console.log("Something changed in local storage", e)
    if (e.key === "spotifyAuthToken") {
      const spotifyAccessToken = e.newValue;

      const spotifyAccess = getSpotifyAccess();

      if (spotifyAccess === "denied") {
        console.log("DENIED")
      } else if (spotifyAccessToken !== null) {
        console.log("SUCCESS:", spotifyAccessToken)
        setSpotifyToken(spotifyAccessToken)
      }
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
        <Route exact path="/welcome" render={(props) => !user ? <SplashScreen user={user} fetchUser={refetch} /> : <Redirect to="/discover" />} />
        <Route exact path="/discover" render={(props) => user ? 
          <DiscoverScreen 
            user={user}
            authorizeSpotifyFromStorage={authorizeSpotifyFromStorage}
            {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/generate" render={(props) => user ? <GenerateScreen user={user} {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/playlists" render={(props) => user ? <PlaylistsScreen user={user} {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/playlist/:id" render={(props) =>
          <PlaylistScreen user={user}
            // authorizeSpotifyFromStorage={authorizeSpotifyFromStorage}
            spotifyToken={spotifyToken}
            setPlayerVisible={setPlayerVisible}
            setTracks={setTracks}
            playerVisible={playerVisible}
            {...props} />} />

        <Route exact path="/profile" render={(props) => user ? <ProfileScreen fetchUser={refetch} user={user} {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/admin" render={(props) => user && user.admin ? <AdminScreen /> : <Redirect to="/welcome" />} />
        <Route exact path="/test" component={LockedScreen} />
        <Route exact path="/profile/:id" render={(props) => user ? <ViewProfileScreen /> : <Redirect to="/welcome" />} />
        <Route exact path="/test2" render={(props) =>
          <PlayerScreen
            authorizeSpotifyFromStorage={authorizeSpotifyFromStorage}
            setSpotifyToken={setSpotifyToken}
            spotifyToken={spotifyToken}
            setTracks={setTracks}
            setPlayerVisible={setPlayerVisible}
            playerVisible={playerVisible}
            {...props} />
        } />
        <Redirect from={"/:any", "/"} to={{ pathname: "/welcome" }} />

      </Switch>
    </BrowserRouter>
  )
}

export default App;
