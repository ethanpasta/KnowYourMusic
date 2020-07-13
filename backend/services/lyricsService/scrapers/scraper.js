const { sanitizeLyrics } = require("../../../utils").helperFuncs;
const { pino } = require("../../../utils").logger;

/** Class handles all lyric scraping */
class LyricScraper {
	constructor() {
		this.scrapers = {
			genius: require("./genius"),
			cana: require("./rld"),
		};
		// In which order to search scrapers
		this.preference = ["cana", "genius"];
	}

	/**
	 * Find lyrics for a song, by searching in the different scrapers.
	 * @return {String} A string containing the lyrics, or undefined if no lyrics are found
	 */
	async findLyrics(title, artist) {
		for (const scraper of this.preference) {
			pino.info(`Searching lyrics for ${title} - ${artist} in ${scraper}`);
			const lyrics = await this.scrapers[scraper].getSongLyrics(title, artist);
			if (lyrics) {
				pino.info(`Found lyrics for ${title} - ${artist} in ${scraper}`);
				return sanitizeLyrics(lyrics, title);
			}
			pino.info(`Couldn't find lyrics for ${title} - ${artist} in ${scraper}`);
		}
	}
}

module.exports = new LyricScraper();
