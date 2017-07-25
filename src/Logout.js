import React, { Component } from 'react';
import LoginPage from './loginPage';

class Logout extends Component {

  render() {
    sessionStorage.clear();
    return (
    <div>
      <h4 style={{textAlign: 'center', color: 'white'}}>
        Logged Out
      </h4>
      <h5 style={{textAlign: 'center', color: 'white'}}>
        Use the below form to login again!
      </h5>
      <div>
        <LoginPage />
      </div>
    </div>
    );
  }
}

export default Logout;