const UserOperations = require("./userOperations");

/**
 * Module handles mapping betweem user session and their instances
 */
class UserMapManager {
	constructor() {
		this.userMap = {};
	}

	// Function adds new user to the map (with or without api instance)
	addUser(username, api) {
		const user = new UserOperations(username);
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

const userSessionMap = new UserMapManager();
Object.freeze(userSessionMap);

module.exports = userSessionMap;
