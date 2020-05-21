const UserSpotifyAPI = require("./UserSpotifyAPI");
const userMap = require("./userMap");
const { User, Song } = require("../models");
const { pino } = require("../utils");

class UserHandler {
	constructor(access_token, refresh_token, expires_in) {
		this.access_token = access_token;
		this.refresh_token = refresh_token;
		this.api = new UserSpotifyAPI(access_token, refresh_token, expires_in);
	}

	async recognizeAndInitialize() {
		// Get user profile from Spotify
		const user = await this.api.getMe();
		const username = user["id"];
		this.username = username;
		this.display_name = user["display_name"];
		userMap[username] = { api: this.api };

		// Check if this user already exists

		const exists = await this.checkUserExists(username);
		if (!exists) {
			pino.info(`New user '${username}', adding him to the system.`);
			await this.initNew();
		}
		return username;
	}

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

	async addUserToDB() {
		return await new User({
			username: this.username,
			display_name: this.display_name,
			access_token: this.access_token,
			refresh_token: this.refresh_token,
		})
			.save()
			.then(doc => pino.info(`Added user to DB ${doc}`))
			.catch(err => pino.error(`Couldn't add user to db. ${err}`));
	}

	async addSongsToDB(songs) {
		return await Song.addManySongs(songs)
			.then(docs => {
				User.addSongsToUser(docs, this.username);
			})
			.catch(err => {
				throw new Error(`Error: ${err}`);
			});
	}

	async checkUserExists() {
		return await User.findOne({ username: this.username })
			.then(user => user != null)
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = UserHandler;
