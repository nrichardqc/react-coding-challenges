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
}
