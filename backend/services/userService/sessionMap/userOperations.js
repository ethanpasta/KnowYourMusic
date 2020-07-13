/** Class handles single instance of a user in the session mapper */
class UserOperations {
	/**
	 * Create a UserOperations instance
	 * @param {string} id - key of the session in the map
	 */
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

module.exports = UserOperations;
