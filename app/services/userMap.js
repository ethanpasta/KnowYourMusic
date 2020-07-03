/**
 * A dictionary that maps between user sessions and their relative instances.
 * Each user needs to have an instance of:
 *   - their personal Spotify API (to get user profile, or to fetch new saved songs)
 *   - a 'Game Manager', to prep the game data, track the game play and return results
 */

class UserInstance {
	constructor(id) {
		this.id = id;
	}

	getSpotifyAPI() {
		return this.api;
	}

	setSpotifyAPI(api) {
		if (!this.api) {
			return (this.api = api);
		}
	}

	getGameManager() {
		return this.gameManager;
	}

	setGameManager(gameManager) {
		if (!this.gameManager) {
			return (this.gameManager = gameManager);
		}
	}
}

class UserMapManager {
	constructor() {
		this.userMap = {};
	}

	addUser(username, api) {
		const user = new UserInstance(username);
		this.userMap[username] = user;
		if (api) {
			return user.setSpotifyAPI(api);
		}
	}

	checkUserExists(username) {
		return username in this.userMap;
	}

	getUser(username) {
		if (username in this.userMap) {
			return this.userMap[username];
		}
	}

	deleteUser(username) {
		if (username in this.userMap) {
			delete this.userMap[username];
		}
	}
}

module.exports = new UserMapManager();
