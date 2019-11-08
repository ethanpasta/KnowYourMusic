const express = require('express');
const request = require('request');
const axios = require('axios');
const utf8 = require('utf8')
var querystring = require('query-string');
const router = express.Router();

/**
 * Fetches 50 tracks from Spotify API with offset
 * @param  {Number} offset       The offset
 * @param  {String} access_token The authorization token for Spotify API
 * @return {JSON}                Data returned from the api
 */
const getTrack = async (offset, access_token) => {
    let url = 'https://api.spotify.com/v1/me/tracks?limit=50';
    url = url + '&access_token=' + access_token + '&offset=' + offset;
    return await axios.get(url)
};

/**
 * Fetches all tracks from library in Spotify
 * @param  {Number} access_token The authorization token for Spotify API
 * @return {Object}              Data for all tracks
 */
const getAllTracks = async (access_token) => {
    let offset = 0;
    // gets first 50 tracks
    let res = await getTrack(offset, access_token);
    res = res.data;
    const all = [];
    res.items.forEach(element => {
        all.push({
            song: element.track.name,
            artist: element.track.artists[0].name
        })
    });
    // loops through while user has more tracks, 50 each time
    while (res.next) {
        offset += 50;
        res = await getTrack(offset, access_token);
        res = res.data;
        res.items.forEach(element => {
            all.push({
                song: element.track.name,
                artist: element.track.artists[0].name
            })
        });
    }
    // data set containing all tracks and artists
    return all;
}

/**
 * Fetches track lyrics from MusixMatch
 * @param  {JSON} obj a track (object containing song name and artist)
 * @return {String}     lyrics of track
 */
const getTrackLyrics = async function (obj) {
    const title = obj.song;
    const artist = obj.artist;
    const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?' +
        querystring.stringify({
            format: 'json',
            q_track: utf8.encode(title),
            q_artist: utf8.encode(artist),
            apikey: '5f6eabe9cb91ff48968b2c582d8c88cc'
        });
    return await axios.get(url);
};

/**
 * Fetches 10 song lyrics, and adds 30 other random songs
 * @param  {JSON}   all contains all tracks for a certain spotify user
 * @return {JSON}       all data necessary for game play
 **/
const getRandomSongs = async (all) => {
    const result = [];
    let len = all.length;
    // Loop until we have 10 songs with lyrics
    while (result.length != 10) {
        const r = Math.floor(Math.random() * len);
        let res = await getTrackLyrics(all[r]);
        // Check if response from musixmatch API contains lyrics
        let lyrics = (res.status === 200 && res.data.message.body && res.data.message.body.lyrics) ? res.data.message.body.lyrics.lyrics_body : false;
        if (lyrics != false) {
            // Remove one-worded lines, empty lines, and 4 last lines (musixmatch data)
            lyrics = lyrics.split(/\r\n|\r|\n/).slice(1, -4).filter((el) => {
                return el && el.split(' ').length > 1;
            });
            result.push({
                tracks: [all[r]],
                // Randomize one of the lines from all lyrics
                line: lyrics[Math.floor(Math.random() * lyrics.length)]
            });
            // Remove selected track from data set, so that it can't be randomized twice
            all[r] = all[--len];
        }
    }
    // Fetch 30 more random songs, with no lyrics
    for (i = 10; i <= 39; i++) {
        const r = Math.floor(Math.random() * len);
        result[i % 10].tracks.push(all[r]);
        all[r] = all[--len];
    }
    return result;
}

/**
 * Collects and returns game data
 * @param  {String} access_token The access token for spotify API
 * @return {JSON}                All game data
 */
const getGameData = function (access_token) {
    return getAllTracks(access_token)
        .then(data => { return getRandomSongs(data) })
        .then(all => { return all })
        .catch(err => {
            return err;
        });
}

/**
 * Route for main game play.
 * Fetches all game data, stores it in session variable, and starts game
 */
router.get('/', function (req, res) {
    if (!req.session.token) {
        res.redirect('/');
    } else {
        const access_token = req.session.token;
        letsFinishThis(access_token).then(data => {
            req.session.game = data;
            console.log(data);
            res.render('level');
        }).catch(err => {
            res.render('error');
            console.log(err);
        });
    }
});

/**
 * Route for client-side, to fetch data
 */
router.get('/data', function (req, res) {
    if (req.session.game) {
        res.send(req.session.game);
    } else {
        res.send(false);
    }
});

/**
 * Route for end of game, client-side posts the game score
 */
router.post('/score', function (req, res) {
    const score = req.body.score;
    req.session.score = score;
    res.end();
})

module.exports = router;
