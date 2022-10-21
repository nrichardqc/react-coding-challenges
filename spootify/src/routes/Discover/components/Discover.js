import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      token: "",
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    const access_token = process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
    fetch(
      "https://accounts.spotify.com/api/token",
      {
        method : "POST",
        body : "grant_type=client_credentials",
        headers : {
          "Authorization" : "Basic " + (new Buffer(access_token).toString('base64')),
          "Content-Type" : "application/x-www-form-urlencoded",
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            token: result.access_token,
            token_type : result.token_type
          });
          console.log("token : " + this.state.token);

          // Requêtes pour aller chercher les trois listes
          this.fetchList("new-releases", "albums", "newReleases");
          this.fetchList("featured-playlists", "playlists", "playlists");
          this.fetchList("categories ", "categories", "categories");
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }


  /**
   * Va chercher une liste sur l'API de spotify
   * @param {string} url La partie finale de l'URL sur l'API
   * @param {string} responsesRootElement L'élément racine de la réponse JSON
   * @param {string} listName Le nom de la liste à mettre à jour dans le state
   */
  fetchList(url, responsesRootElement, listName) {
    fetch(
      "https://api.spotify.com/v1/browse/" + url,
      {
        method : "GET",
        headers : {
          "Authorization" : "Bearer " + this.state.token,
          "Content-Type" : "application/json",
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          const newState = {};
          newState[listName] = result[responsesRootElement].items;
          console.log(newState);
          this.setState(newState);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}
