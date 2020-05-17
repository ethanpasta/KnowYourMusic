/* function cleanLyrics(text) {
	return text.replace(/\[(.*?)\]/g, "");
} */

class lyricFinder {
	constructor({ title, artist }) {
		this.title = title;
		this.artist = artist;
		this.lyricFinders = {
			genius: require("./genius").getSongLyrics,
			cana: require("./rld").getSongLyrics,
		};
	}

	async getLyrics() {
		// Check if
		let lyrics =
			(await this.lyricFinders.genius(this.title, this.artist)) ||
			(await this.lyricFinders.cana(this.title, this.artist));
		if (!lyrics) return;
	}
}

module.exports = lyricFinder;
