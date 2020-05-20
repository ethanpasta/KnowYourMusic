const { sanitizeLyrics } = require("../../utils");

class LyricScraper {
	constructor() {
		this.scrapers = {
			genius: require("./genius"),
			cana: require("./rld"),
		};
		this.preference = ["cana", "genius"];
	}

	async findLyrics(title, artist) {
		this.preference.forEach(async scraper => {
			const lyrics = await this.scrapers[scraper].getSongLyrics(title, artist);
			if (lyrics) return sanitizeLyrics(lyrics);
		});
	}
}

module.exports = new LyricScraper();
