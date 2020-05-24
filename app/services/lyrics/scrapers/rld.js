// "rld" stands for "Random Lyric Dude" - as this api was made by a random lyric dudes' api 🤓
const fetch = require("node-fetch");
const { pino } = require("../../../utils");
const URL = require("url").URL;

class lyricsCanarado {
	constructor() {
		this.baseURL = "https://api.canarado.xyz/lyrics";
	}
	async getSongLyrics(title, artist) {
		const url = new URL(`${this.baseURL}/${title} ${artist}`);
		pino.info(`Getting lyrics from Canarado for ${title} - ${artist}`);
		const res = await fetch(url.href);
		const data = await res.json();
		if (data.status.failed || !data.content.length) return;
		for (const song of data.content) {
			if (this.checkMatch(song.artist, artist)) {
				return song.lyrics;
			}
		}
	}
	checkMatch(resArtist, realArtist) {
		return resArtist.toLowerCase() == realArtist.toLowerCase();
	}
}

module.exports = new lyricsCanarado();
