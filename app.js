var express = require("express");
var bodyParser = require("body-parser");
var SpotifyWebApi = require('spotify-web-api-node');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var clientId = '8e673483a1d3493b9926f6f8ee3ab1c5',
  clientSecret = 'c64a9a52a32b47d49e5eb1bb8cabe80c';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
  //  console.log('The access token is ' + data.body['access_token']);
    access_token=data.body['access_token'];



    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);

console.log(access_token);
