const request = require('request');
const async = require('async');
const axios = require('axios');

const getTrack = function (offset, access_token) {
    let url = 'https://api.spotify.com/v1/me/tracks?limit=50';
    url = url + '&access_token=' + access_token + '&offset=' + offset;
    return axios.get(url).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
};

module.exports = async function getAllTracks(access_token) {
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
    while (offset <= 100 /* res.next */) {
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

