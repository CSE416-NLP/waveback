import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import AdminScreen from './screens/AdminScreen'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route exact path="/admin" component={AdminScreen} />
        <Redirect from="/:any" to={{ pathname: "/" }} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
