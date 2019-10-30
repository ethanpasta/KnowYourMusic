const express = require('express');
const request = require('request');
const axios = require('axios');
const utf8 = require('utf8')
var querystring = require('query-string');
require('dotenv').config();
const router = express.Router();

const getTrack = function (offset, access_token) {
    let url = 'https://api.spotify.com/v1/me/tracks?limit=50';
    url = url + '&access_token=' + access_token + '&offset=' + offset;
    return axios.get(url).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
};
const getAllTracks = async function (access_token) {
    let offset = 0;
    let res = await getTrack(offset, access_token);
    const all = [];
    res.items.forEach(element => {
        let artists = [];
        element.track.artists.forEach(artist => {
            artists.push(artist.name);
        })
        all.push({
            song: element.track.name,
            artists: artists,
        })
    });
    while (res.next) {
        offset += 50;
        res = await getTrack(offset, access_token);
        res.items.forEach(element => {
            let artists = [];
            element.track.artists.forEach(artist => {
                artists.push(artist.name);
            })
            all.push({
                song: element.track.name,
                artists: artists
            })
        });
    }
    return all;
}
const getTrackLyrics = function (obj) {
    const title = obj.song;
    const artist = obj.artists[0];
    const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?' +
        querystring.stringify({
            format: 'json',
            q_track: utf8.encode(title),
            q_artist: utf8.encode(artist),
            apikey: process.env.MUSIX_API_KEY
        });
    return axios.get(url).then(res => {
        if (res.status === 200 &&
            res.data.message.body &&
            res.data.message.body.lyrics) {
            return res.data.message.body.lyrics.lyrics_body;
        }
        else {
            return false;
        }
    }).catch(err => {
        return err;
    });
};
const getRandomSongs = async function (all) {
    const result = [];
    let len = all.length;
    while (result.length != 10) {
        const r = Math.floor(Math.random() * len);
        let lyrics = await getTrackLyrics(all[r])
        if (lyrics != false) {
            lyrics = lyrics.split(/\r\n|\r|\n/).slice(1, -4).filter((el) => {
                return el && el.split(' ').length > 1;
            });
            result.push({
                tracks: [all[r]],
                line: lyrics[Math.floor(Math.random() * lyrics.length)]
            });
            all[r] = all[--len];
        }
    }
    for (i = 10; i <= 39; i++) {
        const r = Math.floor(Math.random() * len);
        result[i % 10].tracks.push(all[r]);
        all[r] = all[--len];
    }
    return result;
}
const letsFinishThis = async function (access_token) {
    return getAllTracks(access_token).then(data => {
        return getRandomSongs(data).then(moredata => {
            return moredata;
        }).catch(err => {
            return err;
        });
    }).catch(err => {
        return err;
    });
}

router.get('/', function (req, res) {
    if (!req.session.token) {
        res.redirect('/');
    } else {
        const access_token = req.session.token;
        if (!req.session.game) {
            letsFinishThis(access_token).then(data => {
                req.session.game = data;
                console.log(data);
                res.render('level');
            }).catch(err => {
                res.render('error');
                console.log(err);
            });
        } else {
            res.render('level');
        }
    }
});

router.get('/data', function (req, res) {
    if (req.session.game) {
        res.send(req.session.game);
    } else {
        res.send(false);
    }
});

router.post('/score', function (req, res) {
    const score = req.body.score;
    req.session.score = score;
    res.redirect('/game/end');
})

router.get('/end', function (req, res) {
    res.render('end', { score: req.session.score });
})





module.exports = router;
