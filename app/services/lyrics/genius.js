const { getLyrics } = require("genius-lyrics-api");
const { pino } = require("../../utils");
require("dotenv").config();

class geniusAPI {
	constructor() {
		this.options = {
			apiKey: process.env.GENIUS_ACCESS_TOKEN,
			optimizeQuery: true,
		};
	}

	getSongLyrics(title, artist) {
		pino.info(`Getting lyrics from Genius for ${title} - ${artist}`);
		return getLyrics({ ...this.options, title, artist });
	}
}

module.exports = new geniusAPI();
