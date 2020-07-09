const { sanitizeLyrics } = require("../../../utils").helperFuncs;

class LyricScraper {
	constructor() {
		this.scrapers = {
			genius: require("./genius"),
			cana: require("./rld"),
		};
		this.preference = ["cana", "genius"];
	}

	async findLyrics(title, artist) {
		for (const scraper of this.preference) {
			const lyrics = await this.scrapers[scraper].getSongLyrics(title, artist);
			if (lyrics) return sanitizeLyrics(lyrics, title);
		}
	}
}

module.exports = new LyricScraper();
