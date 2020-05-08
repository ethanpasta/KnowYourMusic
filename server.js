const express = require('express');
const pino = require('express-pino-logger')();
const SpotifyWebApi = require('spotify-web-api-node');
const cookieParser = require("cookie-parser");
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(pino);
app.use(cookieParser());

const spotify_credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
}

const spotifyApi = new SpotifyWebApi(spotify_credentials);

MongoClient.connect(process.env.MONGO_DB_URL, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

app.get('/auth', (req, res) => {
    const state = generateRandomString(16);
    res.cookie('spotify_auth_state', state);
    const scope = ['user-library-read', 'user-read-email'];
    const auth_url = spotifyApi.createAuthorizeURL(scope, state);
    console.log("Redirecting to: " + auth_url);
    res.redirect(auth_url)
});

app.get('/auth/callback', (req, res) => {
    if (req.params.error) {
        res.redirect('/');
    }
    const {code, state} = req.query;
    if (state != req.cookies['spotify_auth_state']) {
        console.log("Returned state doesn't match: returned_state: " + state + " , real_state: " + req.cookies['spotify_auth_state']);
        res.redirect('/');
        return;
    }
    spotifyApi.authorizationCodeGrant(code).then(
        (data) => {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
        }, 
        (err) => {
            console.log("Something went wrong: " + err);
        }
    );
    res.clearCookie('spotify_auth_state').redirect('/');
});

// console.log that your server is up and running
app.listen(port, () => console.log("Back-end is listening on port " + port));
