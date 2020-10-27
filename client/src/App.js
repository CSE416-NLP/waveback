import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import GenerateScreen from './screens/GenerateScreen';
import PlaylistsScreen from './screens/PlaylistsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LockedScreen from './screens/LockedScreen';
import ViewProfileScreen from './screens/ViewProfileScreen';
import Navbar from './Navbar';

const App = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route exact path="/discover" component={DiscoverScreen} />
        <Route exact path="/generate" component={GenerateScreen} />
        <Route exact path="/playlists" component={PlaylistsScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/admin" component={AdminScreen} />
        <Route exact path="/test" component={LockedScreen} />
        <Route exact path="/profile/test" component={ViewProfileScreen} />
        <Redirect from="/:any" to={{ pathname: "/" }} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
