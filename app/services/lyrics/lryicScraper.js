/* function cleanLyrics(text) {
	return text.replace(/\[(.*?)\]/g, "");
} */

class LyricScraper {
	constructor() {
		this.scrapers = {
			genius: require("./genius").getSongLyrics,
			cana: require("./rld").getSongLyrics,
		};
		this.preference = ["cana", "genius"];
	}

	async findLyrics(title, artist) {
		this.preference.forEach(async scraper => {
			const lyrics = await this.scrapers[scraper](title, artist);
			if (lyrics) return lyrics;
		});
	}
}

module.exports = new LyricScraper();
