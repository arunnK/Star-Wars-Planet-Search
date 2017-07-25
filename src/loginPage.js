import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './loginPage.css';
import Request from 'superagent';

class loginPage extends Component {

  constructor(props){
    super(props);
    this.state = {value: '',
                  name: '',
                  pass: '',
                  year: ''
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);

  }

  handlePasswordChange(event){
    this.setState({pass: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.isAuthenticated(this.state.value, this.state.pass);
    event.preventDefault();
  }

  isAuthenticated(uName,passwd){
    const url = `https://swapi.co/api/people/?search=${uName}`;
   
    Request.get(url).then((response) => {
      if(response.body.count === 0)
      {
        alert("No such user found!");
      }
      else{
        this.setState({
          name: response.body.results[0].name,
          year: response.body.results[0].birth_year
        });
        let userName = this.state.name;
        let year = this.state.year;
        if(uName === userName && passwd === year){  
          sessionStorage.setItem("LoggedIn",true);
          sessionStorage.setItem("UserName",userName);
          this.setState();
        }
        else{
          alert('Please check your username or password!');
        }
      }
    });
  }

  render() {
    const isAlreadyAuthenticated = sessionStorage.getItem("LoggedIn");
    return (
      <div>
        {isAlreadyAuthenticated ? <Redirect to={{pathname: '/search'}}/>: (
          <div className="login-page">
            <h3 className="header">Star Wars Planet Search</h3>
            <h6 className="subHeading">Please "Login" to search for a planet!</h6>
            <div className="form">
              <form method="post" onSubmit={this.handleSubmit} className="login-form">
                <input type="text" placeholder="Enter Username" name="userName" value={this.state.value} onChange={this.handleUsernameChange} required/>
                <input type="password" placeholder="Enter Password" name="pass" value={this.state.pass} onChange={this.handlePasswordChange} required/>
                <button className='button'>Login</button>
              </form>
            </div>
          </div>
        )}
      </div>
    )       
  }
}

export default loginPage;
