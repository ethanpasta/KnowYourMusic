const Song = require("../../models/songs");
const { pino } = require("../../utils/logger");

// Class manages all lyrics functionalities

class LyricManager {
	constructor() {
		this.lyricScraper = require("./lyricScraper");
	}

	// Finding lyrics (if exists) of a song from database
	findLyricsInDB(id) {
		return Song.findLyricsIfExists(id);
	}

	// Add lyrics to an existing song in the database
	addLyricsToDB(id, lyrics) {
		return Song.addLyricsToSong(id, lyrics);
	}

	// Find lyrics for a song
	async getLyrics(id, title, artist) {
		pino.info(`>>> Searching for lyrics for song '${title}' in DB`);
		let lyrics = await this.findSongInDB(id);
		if (lyrics) {
			return lyrics;
		}
		pino.info(`>>> Not in DB. Searching for lyrics for song '${title}' in scrapers`);
		lyrics = await this.lyricScraper.findLyrics(title, artist);
		if (!lyrics) {
			throw new Error(`No lyrics for ${title} - ${artist}`);
		}
		await this.addLyricsToDB(id, lyrics);
		return lyrics;
	}
}

module.exports = new LyricManager();
