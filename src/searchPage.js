import React, { Component } from 'react';
import './searchPage.css';
import {Redirect, Link} from 'react-router-dom';
import _ from 'lodash';
import Request from 'superagent';

let count = 0;

class searchPage extends Component {
  pristine = true;
  constructor(props){
    super(props);
    this.state = {
      query: '',
      planets: ''
    };
  }

  isAuthenticated(){
      return sessionStorage.getItem("LoggedIn");
  }

  resetCounter(){
    count = 0;
  }

  planetSearch = (event) => {
    if (event) {
      const url = `https://swapi.co/api/planets/?search=${event.target.value}`;
      let userName = sessionStorage.getItem("UserName");
      if(userName !== "Luke Skywalker"){
        if(this.pristine){
          setInterval(this.resetCounter, 60000);
          this.pristine = false;
        }
        count = count + 1;
        if(count > 15){
          alert("You have exceeded the number of searches in 1 minute!")
          return;
        }
      }
      Request.get(url).then((response) => {
      this.setState({ planets: response.body.results
          });
      })
    }
  }

  render() {
    this.planetSearch();
    const isAlreadyAuthenticated = this.isAuthenticated();
    let planets = _.map(this.state.planets, (planet) => { 
      let population = Math.log(planet.population);
      if(planet.population === 'unknown'){
        population = 15; 
      }
      return <div id="searchResult" style={{height:(population*3.5)}}><li>{planet.name} ({planet.population})</li></div>;
    });

    return (
      <div>
        {!isAlreadyAuthenticated ? <Redirect to={{pathname: '/'}}/> : (
        <div>
          <div className="logout"><Link to = '/logout' className="logoutText">Logout</Link></div>
          <h3 className="header">Star Wars Planet Search</h3>
          <input className="searchBox" type="text" onChange={this.planetSearch} placeholder="Start typing to search a planet..." name="searchbox" required/>
          <ul className="results">{planets}</ul>
        </div>
        )}
      </div>
    )
  }
}

export default searchPage;