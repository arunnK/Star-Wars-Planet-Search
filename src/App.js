import React, { Component } from 'react';

import './App.css';
import Request from 'superagent';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {value: '',
                  name: '',
                  pass: '',
                  year: ''
    };

    this.passChange = this.passChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginCheck = this.loginCheck.bind(this);

  }
  
  passChange(event){
    this.setState({pass: event.target.value})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.loginCheck(this.state.value, this.state.pass);
    event.preventDefault();
  }

  loginCheck(uName,passwd){
    var url = `https://swapi.co/api/people/?search=${uName}`;
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
        var userName = this.state.name;
        var year = this.state.year;
        if(uName === userName && passwd === year){
          alert('Login Successfull!');
        }
        else{
          alert('Please check your username or password!');
        }
      }
    });
  }
  render() {
    return (
      <div className="login-page">
        <h3 className="header">Star Wars Planet Search</h3>
        <h6 className="subHeading">Please "Login" to search for a planet!</h6>
        <div className="form">
          <form method="post" onSubmit={this.handleSubmit} className="login-form">
            <input type="text" placeholder="Enter Username" name="userName" value={this.state.value} onChange={this.handleChange} required/>
            <input type="password" placeholder="Enter Password" name="pass" value={this.state.pass} onChange={this.passChange} required/>
            <button>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
