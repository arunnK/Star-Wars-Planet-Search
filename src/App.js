import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import loginPage from './loginPage';
import searchPage from './searchPage';
import Logout from './Logout';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={loginPage} />
              <Route path='/search' component={searchPage}/>
              <Route path="/logout" component={Logout} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
