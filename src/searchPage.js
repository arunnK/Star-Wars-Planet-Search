import React, { Component } from 'react';
import './searchPage.css';
import {Redirect} from 'react-router-dom';

class searchPage extends Component {

  isAuthenticated(){
    return sessionStorage.getItem("LoggedIn");
  }

  render() {
    const isAlreadyAuthenticated = this.isAuthenticated();
    return (
        <div>
          {!isAlreadyAuthenticated ? <Redirect to={{pathname: '/'}}/> : (
          <p className='sample'>New Page</p>)
          }
        </div>
    )
  }
}

export default searchPage;