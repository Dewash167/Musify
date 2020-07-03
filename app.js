
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/",function(req,res) {

res.render("start");


  });





app.post("/",function(req,res) {

  res.render("dashboard");


  });



  app.post("/playlist",function(req,res) {
    var playlist_id = req.body.playlist;


    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
      //  console.log(token);
        var options = {
           url : 'https://api.spotify.com/v1/playlists/'+playlist_id,

        //  url: 'https://api.spotify.com/v1/users/jmperezperez',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
        //  res.send(body);
          var name=body.name;
          var description=body.description;
          var imgurl=body.images[0].url;
          var id=body.id;
          var ownername=body.owner.display_name;
          var spotifyurl=body.uri;
          var followers=body.followers.total;
          var collabarative = body.collaborative;
          var type= body.type;
          var snapshopid = body.snapshot_id;
           res.render('playlist', { name : name,description:description});

        });
      }
    });



  });




    app.post("/artist",function(req,res) {
      var artistid = req.body.artist;

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

          // use the access token to access the Spotify Web API
          var token = body.access_token;
        //  console.log(token);
          var options = {
             url : 'https://api.spotify.com/v1/playlists/'+artistid,

          //  url: 'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };
          request.get(options, function(error, response, body) {
           res.send(body);


          });
        }
      });



    });

      app.post("/tracks",function(req,res) {
        var track = req.body.track;


        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
          //  console.log(token);
            var options = {
               url : 'https://api.spotify.com/v1/tracks/'+track,

            //  url: 'https://api.spotify.com/v1/users/jmperezperez',
              headers: {
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
            request.get(options, function(error, response, body) {
            // res.send(body);
//  console.log(options.url);

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
