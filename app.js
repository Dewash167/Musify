const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

var request = require('request'); // "Request" library

var client_id = '8e673483a1d3493b9926f6f8ee3ab1c5'; // Your client id
var client_secret = '5589eabe4c9245c4b9f6bc0a4db40afc'; // Your secret
// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};






const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));





app.get("/", function(req, res) {

  res.render("start");


});



app.get("/profile", function(req, res) {

  res.render("profile");


});





app.post("/", function(req, res) {

  res.render("dashboard");


});



app.get("/playersettings", function(req, res) {

  res.render("player");


});


app.post("/playlist", function(req, res) {
  var playlist_id = req.body.playlist;


  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
       console.log(body);
      var options = {
        url: 'https://api.spotify.com/v1/playlists/' + playlist_id,

        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        //  res.send(body);
        var name = body.name;
        var description = body.description;
        var imgurl = body.images[0].url;
        var id = body.id;
        var ownername = body.owner.display_name;
        var spotifyurl = body.uri;
        var followers = body.followers.total;
        var collabarative = body.collaborative;
        var type = body.type;
        var snapshopid = body.snapshot_id;
        res.render('playlist', {
          name: name,
          description: description,
          imgurl: imgurl,
          id: id,
          ownername: ownername,
          spotifyurl: spotifyurl,
          followers: followers,
          collabarative: collabarative,
          type: type,
          snapshopid: snapshopid
        });

      });
    }
  });



});




app.post("/artist", function(req, res) {
  var artistid = req.body.artist;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      //  console.log(token);
      var options = {
        url: 'https://api.spotify.com/v1/artists/' + artistid,

        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        //  res.send(body);
        var name = body.name;
        //  var description = "Artist -  " + body.artists[0].name;
        var genres = 'body.genres[0],' + 'body.genres[1],' + 'body.genres[2]';
        var imgurl = body.images[0].url;
        var id = body.id;
        var followers = body.followers.total;
        var popularity = body.popularity;
        var spotifyurl = body.external_urls.spotify;
        //  var duration = body.duration_ms;
        //  var collabarative = body.collaborative;
        var type = body.type;


        res.render('artists', {
          name: name,
          genres: genres,
          popularity: popularity,
          followers: followers,

          imgurl: imgurl,
          id: id,

          spotifyurl: spotifyurl,

          type: type,

        });


      });
    }
  });



});


app.post("/albums", function(req, res) {
  var albumsid = req.body.albums;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      //  console.log(token);
      var options = {
        url: '	https://api.spotify.com/v1/albums/' + albumsid,

        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        var name = body.name;
        var label = body.label;
        var imgurl = body.images[0].url;
        var id = body.id;
        var ownername = body.artists[0].name;
        var spotifyurl = body.external_urls.spotify;
        //  var duration = body.duration_ms;
        //  var collabarative = body.collaborative;
        var popularity = body.popularity;
        var releasedate = body.release_date;
        var total_tracks = body.total_tracks;
        var type = body.type;
        //  var tracks = body.;
        //  var snapshopid = body.snapshot_id;
        res.render('albums', {
          name: name,
          //  description: description,
          label: label,
          ownername: ownername,
          popularity: popularity,
          releasedate: releasedate,
          total_tracks: total_tracks,
          imgurl: imgurl,
          id: id,
          ownername: ownername,
          spotifyurl: spotifyurl,

          type: type,

        });


      });
    }
  });



});



app.post("/tracks", function(req, res) {
  var track = req.body.track;


  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      //  console.log(token);
      var options = {
        url: 'https://api.spotify.com/v1/tracks/' + track,

        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        //res.send(body);
        // console.log(options.url);
        var name = body.name;
        var description = "Artist -  " + body.artists[0].name;
        var imgurl = body.album.images[0].url;
        var id = body.id;
        var ownername = body.artists[0].name;
        var spotifyurl = body.external_urls.spotify;
        var duration = body.duration_ms;
        //  var collabarative = body.collaborative;
        var type = body.type;
        //  var snapshopid = body.snapshot_id;
        res.render('tracks', {
          name: name,
          description: description,
          imgurl: imgurl,
          id: id,
          ownername: ownername,
          spotifyurl: spotifyurl,

          type: type,

        });


      });
    }
  });



});


app.get("/recently", function(req, res) {



  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
      body.scope='user-read-recently-played';
      console.log(body.scope);
      // use the access token to access the Spotify Web API
      var token = body.access_token;

       console.log(token);
      var options = {
        url: 'https://api.spotify.com/v1/me/player/recently-played',
       scope: 'user-read-recently-played',
        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        res.send(body);
        // console.log(options.url);



      });
    }
  });



});

app.post("/albums", function(req, res) {
  var albumsid = req.body.albums;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      //  console.log(token);
      var options = {
        url: '	https://api.spotify.com/v1/albums/' + albumsid,

        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        var name = body.name;
        var label = body.label;
        var imgurl = body.images[0].url;
        var id = body.id;
        var ownername = body.artists[0].name;
        var spotifyurl = body.external_urls.spotify;
        //  var duration = body.duration_ms;
        //  var collabarative = body.collaborative;
        var popularity = body.popularity;
        var releasedate = body.release_date;
        var total_tracks = body.total_tracks;
        var type = body.type;
        //  var tracks = body.;
        //  var snapshopid = body.snapshot_id;
        res.render('albums', {
          name: name,
          //  description: description,
          label: label,
          ownername: ownername,
          popularity: popularity,
          releasedate: releasedate,
          total_tracks: total_tracks,
          imgurl: imgurl,
          id: id,
          ownername: ownername,
          spotifyurl: spotifyurl,

          type: type,

        });


      });
    }
  });



});



app.post("/search", function(req, res) {
  var query = req.body.query;
  var type = req.body.type;

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      //  console.log(token);
      var options = {
        url:  'https://api.spotify.com/v1/search?q=' + query +'&type='+type,


        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        res.send(body);
        console.log(options.url);
        // var name = body.name;
        // var description = "Artist -  " + body.artists[0].name;
        // var imgurl = body.album.images[0].url;
        // var id = body.id;
        // var ownername = body.artists[0].name;
        // var spotifyurl = body.external_urls.spotify;
        // var duration = body.duration_ms;
        // //  var collabarative = body.collaborative;
        // var type = body.type;
        // //  var snapshopid = body.snapshot_id;
        // res.render('tracks', {
        //   name: name,
        //   description: description,
        //   imgurl: imgurl,
        //   id: id,
        //   ownername: ownername,
        //   spotifyurl: spotifyurl,
        //
        //   type: type,
        //
        // });


      });
    }
  });



});









//  console.log(userid);

//
// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//
//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//   //  console.log(token);
//     var options = {
//        url : 'https://api.spotify.com/v1/users/'+userid,
//
//     //  url: 'https://api.spotify.com/v1/users/jmperezperez',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, body) {
//       var data = JSON.parse(body);
//
//
//     });
//   }
// });
//
//
//
// });









let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {
  console.log("Server started on port 3000!");
});
