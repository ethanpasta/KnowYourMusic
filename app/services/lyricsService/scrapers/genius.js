const { getLyrics } = require("genius-lyrics-api");
require("dotenv").config();

class geniusAPI {
	constructor() {
		this.options = {
			apiKey: process.env.GENIUS_ACCESS_TOKEN,
			optimizeQuery: true,
		};
	}

	async getSongLyrics(title, artist) {
		const lyrics = await getLyrics({ ...this.options, title, artist });
		return lyrics;
	}
}

module.exports = new geniusAPI();
