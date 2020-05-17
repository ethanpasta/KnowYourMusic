// "rld" stands for "Random Lyric Dude" - as this api was made by a random lyric dudes' api 🤓
const fetch = require("node-fetch");
const { pino } = require("../../utils/logger");

class lyricsCanarado {
	constructor() {
		this.baseURL = "https://api.canarado.xyz/lyrics/";
	}
	getSongLyrics(title, artist) {
		const query = `${title} ${artist}`.replace(/\s/g, "%20");
		pino.info(`Getting lyrics from Canarado for ${title} - ${artist}`);
		return fetch(`${this.baseURL}${query}`)
			.then(res => res.json())
			.then(body => {
				if (body.status.failed || !body.content.length) return;
				return body.content[0].lyrics;
			});
	}
}

module.exports = new lyricsCanarado();
