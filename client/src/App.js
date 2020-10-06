import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import AdminScreen from './screens/AdminScreen';
import LockedScreen from './screens/LockedScreen';

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route exact path="/admin" component={AdminScreen} />
        <Route exact path="/test" component={LockedScreen} />
        <Redirect from="/:any" to={{ pathname: "/" }} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
