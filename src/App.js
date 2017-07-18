import React, { Component } from 'react';
import Request from 'superagent';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import loginPage from './loginPage';
import searchPage from './searchPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = sessionStorage.getItem("LoggedIn");
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={loginPage} />
              <Route path='/search' component={searchPage}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
