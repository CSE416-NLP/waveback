import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { GET_DB_USER } from './cache/queries';
import { useQuery } from '@apollo/react-hooks';
import { COLOR_SCHEMES } from './styles/ColorSchemes'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import GenerateScreen from './screens/GenerateScreen';
import PlaylistsScreen from './screens/PlaylistsScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import LockedScreen from './screens/LockedScreen';
import ViewProfileScreen from './screens/ViewProfileScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import ViewPlaylistScreen from './screens/ViewPlaylistScreen';
import Navbar from './UtilityComponents/Navbar';
import { getSpotifyAccess, getSpotifyAccessToken, getSpotifyTokenExpirationTime } from "./data/LocalStorage";
import SpotifyPlayer from 'react-spotify-web-playback';
import { jsTPS } from './utils/jsTPS';

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
  const [tracks, setTracks] = useState({
    uris: ['spotify:track:5yK37zazHUe3WxEvymZs20', "spotify:track:46OFHBw45fNi7QNjSetITR", "spotify:track:6i3uaiOs9AMxEq5bYoiro0"],
    offset: 0
  })
  const [playStatus, setPlayStatus] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [currentPlaylistID, setCurrentPlaylistID] = useState(null);

  // console.log("token: ", spotifyToken);
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

  let transactionStack = new jsTPS();

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Switch>
        <Route exact path="/welcome" render={(props) => !user ? <SplashScreen user={user} fetchUser={refetch} /> : <Redirect to="/discover" />} />
        <Route exact path="/discover" render={(props) => user ?
          <DiscoverScreen
            user={user}
            playerVisible={playerVisible}
            setPlayerVisible={setPlayerVisible}
            spotifyToken={spotifyToken}
            authorizeSpotifyFromStorage={authorizeSpotifyFromStorage}
            {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/generate" render={(props) => user ? <GenerateScreen user={user} {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/playlists" render={(props) => user ? <PlaylistsScreen user={user} {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/playlist/:owner/:id" render={(props) =>
          <PlaylistScreen
            user={user}
            tps={transactionStack}
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
            spotifyToken={spotifyToken}
            setPlayerVisible={setPlayerVisible}
            setTracks={setTracks}
            playerVisible={playerVisible}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            currentPlaylistID={currentPlaylistID}
            setCurrentPlaylistID={setCurrentPlaylistID}
            {...props} />} />
        <Route exact path="/viewplaylist/:owner/:id" render={(props) =>
          <ViewPlaylistScreen
            user={user}
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
            spotifyToken={spotifyToken}
            setPlayerVisible={setPlayerVisible}
            setTracks={setTracks}
            playerVisible={playerVisible}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            currentPlaylistID={currentPlaylistID}
            setCurrentPlaylistID={setCurrentPlaylistID}
            {...props} />} />
        <Route exact path="/profile" render={(props) => user ? <ProfileScreen fetchUser={refetch} user={user} {...props} /> : <Redirect to="/welcome" />} />
        <Route exact path="/admin" component={LockedScreen} user={user} {...props} spotifyToken={spotifyToken} />
        <Route exact path="/profile/:id" render={(props) => user ? <ViewProfileScreen fetchUser={refetch} {...props} /> : <Redirect to="/welcome" />} />
        <Redirect from={"/:any", "/"} to={{ pathname: "/welcome" }} />
      </Switch>
      {spotifyToken &&
        <div className="songPlayingBar">
          {(playerVisible === true || playerVisible === false) &&
            <div className="windowButtonContainer" onClick={() => setPlayerVisible(!playerVisible)}>
              {playerVisible ? <Icon className="playerWindowButton big window minimize" /> : <Icon className="playerWindowButton big window maximize" />}
            </div>}
          <div style={{ width: "100%", display: playerVisible ? "block" : "none" }}>
            <SpotifyPlayer
              play={playStatus}
              token={spotifyToken}
              offset={tracks.offset}
              uris={tracks.uris}
              name="Waveback"
              styles={{
                bgColor: "var(--background)",
                sliderColor: "var(--buttonColor)",
                sliderTrackColor: "var(--primary)",
                color: "var(--accent)",
                sliderhandleColor: "var(--accent)",
                trackNameColor: "var(--accent)",
                trackArtistColor: "var(--buttonColor)"
              }}
              callback={(state) => {
                if (state.isPlaying) {
                  setCurrentSongIndex(tracks.uris.indexOf(state.track.uri))
                }
                setPlayStatus(state.isPlaying)
              }}
            />
          </div>
        </div>}
    </BrowserRouter>
  )
}

export default App;
