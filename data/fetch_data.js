const getSongs = require('./fetch_songs');
const request = require('request');
const async = require('async');
const axios = require('axios');
const utf8 = require('utf8')
var querystring = require('query-string');
require('dotenv').config();

const api_key = process.env.MUSIX_API_KEY;

const getTrackLyrics = function (obj) {
    const title = obj.song;
    const artist = obj.artists[0];
    const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?' +
        querystring.stringify({
            format: 'json',
            q_track: utf8.encode(title),
            q_artist: utf8.encode(artist),
            apikey: api_key
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
    const result = {
        real: [],
        fake: []
    };
    let len = all.length;
    while (result.real.length != 10) {
        const r = Math.floor(Math.random() * len);
        let lyrics = await getTrackLyrics(all[r])
        if (lyrics != false) {
            lyrics = lyrics.split(/\r\n|\r|\n/).slice(1, -4).filter((el) => {
                return el && el.split(' ').length > 1;
            });
            result.real.push({
                track: all[r],
                line: lyrics[Math.floor(Math.random() * lyrics.length)]
            });
            all[r] = all[--len];
        }
    }
    while (result.fake.length != 30) {
        const r = Math.floor(Math.random() * len);
        result.fake.push({ track: all[r] });
        all[r] = all[--len];
    }
    return result;
}

/* const orgData = async function (data) {
    const final = {};
    for (let i = 1; i <= 10; i++) {
        final.push({
            'level_${i}':  
        });
    }
} */

module.exports = async function getAllData(access_token) {
    return getSongs(access_token).then(data => {
        console.log(data);
        return getRandomSongs(data);
    }).catch(err => {
        return err;
    });
};