const { User, Song } = require("../../models");
const lyricManager = require("../lyricsService");
const { pino } = require("../../utils").logger;
const { OPTIONS_PER_LEVEL, NUM_OF_LEVELS } = require("../../utils").constants;
const { listRange } = require("../../utils").helperFuncs;

class GameData {
	constructor(username) {
		this.username = username;
		// Object stores game answers
		this.answers = {};
		// Object stores game data to send to client
		this.clientData = {};
		// Object stores users answers and score
		this.userProgress = {
			score: 0,
			levels: {},
		};
	}

	// Function preps and returns the game data object
	async prepAndGetData() {
		// Number of options (per number of levels and options per level) that aren't correct
		const numWrongOptions = OPTIONS_PER_LEVEL * NUM_OF_LEVELS - NUM_OF_LEVELS;
		pino.info(`>>> Getting ${NUM_OF_LEVELS} songs with lyrics`);
		const songsWithLyrics = await this.getAllLyrics(NUM_OF_LEVELS);
		pino.info(`>>> Getting ${numWrongOptions} songs without lyrics`);
		const songsWithoutLyrics = await this.getSongDocs(numWrongOptions, songsWithLyrics, false);
		pino.info(">>> Generating game data");
		this.generateGameData(songsWithLyrics, songsWithoutLyrics);
		return this.clientData;
	}

	/**
	 * Function builds both game data objects - one for answers and one sent to the client.
	 * In order to maximize the unpredictability of the game, a random option is chosen each level
	 * to be the "correct" answer. This way the user has no possibility of knowing which option is the correct one.
	 * @param {List} swithl "songs with lyrics" - a list of songs with lyrics for the "correct" options
	 * @param {List} swithoutl "song without lyrics" - a list of songs without lyrics for the "wrong" options
	 */
	generateGameData(swithl, swithoutl) {
		let correctOption, restOptions;
		// Get random line from lyrics
		const randomLine = lyrics => lyrics[Math.floor(Math.random() * lyrics.length)];
		// Build game data object for each level
		for (let level = 1; level <= NUM_OF_LEVELS; level++) {
			// resOptions: a range from 1 to number of options
			restOptions = listRange(OPTIONS_PER_LEVEL);
			// Randomize a number from number of options, and remove and return it from list
			correctOption = restOptions.splice(
				restOptions.indexOf(Math.floor(Math.random() * OPTIONS_PER_LEVEL)),
				1
			)[0];
			this.clientData[level] = {
				line: randomLine(swithl[level - 1] ? swithl[level - 1].lyrics : []),
				options: {},
			};
			// Set correct option for this level in game data
			this.answers[level] = correctOption;
			// Set correct option for client data
			this.clientData[level].options[correctOption] = this.parseSongObject(swithl[level - 1]);
			restOptions.map(
				// Set rest of the options to songs without lyrics
				(opt, i) =>
					(this.clientData[level].options[opt] = this.parseSongObject(
						swithoutl[(level - 1) * restOptions.length + i]
					))
			);
		}
	}

	// A recursive function that returns a list of {numSongs} song objects with lyrics
	async getAllLyrics(numSongs, totalLyrics = [], exclude = []) {
		let songs = await this.getSongDocs(numSongs, exclude, true);
		// Concurrently try to find lyrics of all the songs returned
		let moreLyrics = await Promise.allSettled(
			songs.map(song => lyricManager.getLyricsAndHandle(song))
		);
		moreLyrics = moreLyrics.map(promise => promise.value);
		// Filter out songs that their lyrics couldn't be found (value of undefined or null)
		moreLyrics = songs.reduce((acc, curr, i) => {
			moreLyrics[i] && acc.push({ ...curr.toObject(), lyrics: moreLyrics[i].split("\n") });
			return acc;
		}, []);
		totalLyrics.push(...moreLyrics);
		if (totalLyrics.length >= numSongs) {
			return totalLyrics.slice(0, NUM_OF_LEVELS);
		}
		pino.info(`>>> Found ${totalLyrics.length} songs with lyrics so far. Searching for more.`);
		return this.getAllLyrics(numSongs - 1, totalLyrics, exclude.concat(songs));
	}

	/**
	 * Function associates between 'User' model helper function "getRandomUserSongs" which returns
	 * a list of song ids, and 'Song' model helper function "getSongsByIds" which accepts a list of ids
	 * and returns song documents.
	 * Returns a list of song documents.
	 * @param {Number} numSongs Number of songs to get
	 * @param {List} exclude Which songs to exclude
	 * @param {Boolean} withLyrics If songs should contain lyrics
	 */
	async getSongDocs(numSongs, exclude, withLyrics) {
		const randomSongIds = await User.getRandomUserSongs(this.username, numSongs, exclude);
		return await Song.getSongsByIds(randomSongIds, withLyrics);
	}

	parseSongObject(obj) {
		return {
			id: obj._id,
			title: obj.title,
			artist: obj.artist,
		};
	}

	handleUserChoice(level, chosenOption) {
		console.log(`Handling level ${level}, chosen option ${chosenOption}`);
		if (level in this.userProgress.levels) {
			console.log("Level already existed..");
			return;
		}
		const levelPassed = this.answers[level] == chosenOption;
		this.userProgress.score += levelPassed;
		this.userProgress.levels[level] = levelPassed;
		return { levelPassed, ...(levelPassed ? {} : { correctOption: this.answers[level] }) };
	}
}

module.exports = GameData;
