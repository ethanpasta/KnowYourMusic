const UserSpotifyAPI = require("./UserSpotifyAPI");
const sessionManager = require("./sessionMap/SessionMap");
const { User, Song } = require("../../models");
const { pino } = require("../../utils").logger;

/**
 * Class handles user after he logs in with Spotify. Handles two possibilites:
 *  - User is new, and we add him to the system
 *  - User exists and is logging in from a new device (therefore his session doesn't exist), we retrieve his existing
 * information.
 */
class UserAuthHandler {
	/**
	 * Create a UserAuthHandler
	 * @param {String} access_token Spotify API access token
	 * @param {String} refresh_token Spotify API refresh token
	 * @param {Number} expires_in Expiration time of the access token
	 */
	constructor(access_token, refresh_token, expires_in) {
		this.access_token = access_token;
		this.refresh_token = refresh_token;
		this.api = new UserSpotifyAPI(access_token, refresh_token, expires_in);
	}

	/**
	 * Check if the user exists, and handle the result
	 * @return {String} The users username
	 */
	async recognizeAndInitialize() {
		// Get user profile from Spotify
		const user = await this.api.getMe();
		const username = user["id"];
		this.username = username;
		this.display_name = user["display_name"];

		// Add user and spotify api to userMap
		sessionManager.addUser(username, this.api);

		// Check if this user already exists
		const exists = await this.checkUserExists(username);
		if (!exists) {
			pino.info(`New user '${username}', adding him to the system.`);
			await this.initNew();
		}
		return username;
	}

	/** Initialize a new user */
	async initNew() {
		pino.info(`>>> Adding new user ${this.username} to DB`);
		await this.addUserToDB(
			this.username,
			this.display_name,
			this.access_token,
			this.refresh_token
		);

		pino.info(`>>> Getting all songs of new user ${this.username}`);
		const songs = await this.api.getAllSongs();

		pino.info(`>>> Adding all songs for ${this.username} to the DB and associating them`);
		await this.addSongsToDB(songs, this.username);
	}

	/** Add the user to the DB */
	async addUserToDB() {
		return await User.create(
			this.username,
			this.display_name,
			this.access_token,
			this.refresh_token
		)
			.then(doc => pino.info(`Added user to DB ${doc}`))
			.catch(err => pino.error(`Couldn't add user to db. ${err}`));
	}

	/** Add a collection of songs to the database */
	async addSongsToDB(songs) {
		return await Song.addManySongs(songs)
			.then(docs => {
				User.addSongsToUser(docs, this.username);
			})
			.catch(err => {
				throw new Error(`Error: ${err}`);
			});
	}

	/** Checks if the user exists */
	async checkUserExists() {
		return await User.findOne({ username: this.username })
			.then(user => user != null)
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = UserAuthHandler;
