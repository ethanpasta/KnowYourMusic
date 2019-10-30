const express = require('express');
const request = require('request');
const querystring = require('query-string');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const router = express.Router();


const my_client_id = 'f47820612ffa4f99aa3da9cbcd4efc5f';
const my_client_secret = 'c3f2f2615a544171802c4d41fcb59ca4';
const redirect_uri = 'http://localhost:3000/callback';


router.get('/', function (req, res) {
  if (req.session.token != undefined){
    axios.get('https://api.spotify.com/v1/me?access_token=' + req.session.token).then(data => {
      const name = data.data.display_name;
      res.render('index', {name: name});
    }).catch(err => {
      console.log(err);
      res.render('error');
    });
  } else {
    res.render('index', {name: false});
  }
});



/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';


router.get('/login', function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scopes = ['user-library-read', 'user-read-email'];
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: my_client_id,
      scope: scopes,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(my_client_id + ':' + my_client_secret).toString('base64'))
      },
      json: true
    };
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        req.session.token = access_token;
        req.session.refresh = refresh_token;
        res.redirect('/');
      } else {
        console.log(error);
        console.log(response.statusCode);
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


module.exports = router;

