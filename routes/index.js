const express = require('express');
const request = require('request');
const querystring = require('query-string');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const router = express.Router();


const my_client_id = '';
const my_client_secret = '';


/**
 * Route for index page before user logs in
 */
router.get('/', function (req, res) {
  res.render('index', { name: false });
});

/**
 * Route for index page after user logs in
 */
router.get('/start', function (req, res) {
  if (req.session.token != undefined) {
    // Get name of Spotify user
    axios.get('https://api.spotify.com/v1/me?access_token=' + req.session.token).then(response => {
      const name = response.data.display_name;
      res.render('index', { name: name });
    }).catch(err => {
      console.log(err);
      res.render('error');
    });
  } else {
    res.redirect('/');
  }
});

/**
 * Client-side posts access token after spotify login
 */
router.post('/access', function (req, res) {
  const token = req.body.token;
  req.session.token = token;
  res.end();
})

/**
 * Route for end of game
 */
router.get('/end', function (req, res) {
  if (req.session.score) {
      const score = req.session.score;
      res.render('end', { score: score });
  } else {
      res.redirect('/');
  }
});

/**
 * Client-side route, to send over Spotify API code
 */
router.get('/client-id', function (req, res) {
  res.send(my_client_id);
})


/* router.get('/login', function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scopes = ['user-library-read', 'user-read-email'];
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: my_client_id,
      scope: scopes,
      redirect_uri: redirect_uri,
      state: state,
      show_dialog: true
    }));
}); */

/**
 * Route for callback after Spotify login
 */
router.get('/callback', function (req, res) {
  res.render('callback');
  /* const code = req.query.code || null;
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
        res.redirect('/start');
      } else {
        console.log(error);
        console.log(response.statusCode);
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    }); */
});


module.exports = router;

