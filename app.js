require('dotenv').config()
var express = require("express");
const https = require('https');
var bodyParser = require("body-parser");
var SpotifyWebApi = require('spotify-web-api-node');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Set necessary parts of the credentials on the constructor
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENTID,
  clientSecret:process.env.CLIENTSECRET

});
  console.log(process.env.CLIENTID);
spotifyApi.setAccessToken('BQAc_CWjPEI5ElDFiUNmCl7JQMqUuZJrHVrH__xUBh23LPsNF0_RlFvPotxH0QgWFEv_toWqoc1cfskgd8q74qZi4zSYBkoDD6r_xK_cQ_s8EE1Dix-3JDpAzg0JlYzvwW28LJroEVRJUmnKQA3vYM-3sOnIhnq450E0Vv9_qpVY9sc');
spotifyApi.getArtistAlbums('1HY2Jd0NmPuamShAr6KMms').then(
  function(data) {
    console.log('Artist albums', data.body);
  },
  function(err) {
    console.error(err);
  }
);
let port = 3000;




app.listen(port, function() {
  console.log("Server started on port!");
});
