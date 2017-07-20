import React, { Component } from 'react';
import './searchPage.css';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import Request from 'superagent';

class searchPage extends Component {
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

  planetSearch = (event) => {
    if (event) {
      const url = `https://swapi.co/api/planets/?search=${event.target.value}`;
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
      return <div id="searchResult" style={{height:(population*3)}}><li>{planet.name} ({planet.population})</li></div>;
    });

    return (
      <div className="searchComponent">
        {!isAlreadyAuthenticated ? <Redirect to={{pathname: '/'}}/> : (
        <div>
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