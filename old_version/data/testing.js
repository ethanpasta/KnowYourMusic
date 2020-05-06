const async = require('async');
const axios = require('axios');
const utf8 = require('utf8')
var querystring = require('query-string');
require('dotenv').config();


const api_key = process.env.MUSIX_API_KEY;
console.log(api_key === '5f6eabe9cb91ff48968b2c582d8c88cc')
const title = 'Starving';
const artist = 'Hailee Steinfeld';
const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?' +
    querystring.stringify({
        format: 'json',
        q_track: utf8.encode(title),
        q_artist: utf8.encode(artist),
        apikey: utf8.encode(api_key)
    });
console.log(url);
axios.get(url).then(res => {
    console.log(res.data);
    if (res.data.message.body.lyrics.lyrics_body != undefined) console.log(res.data.message.body.lyrics.lyrics_body);
    else {
        console.log("nope");
    }
}).catch(err => {
    console.log(err);
});