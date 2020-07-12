const UserOperations = require("./userOperations");

/** Class handles mapping betweem user session and their instances */
class SessionMap {
	/** Create a SessionMap */
	constructor() {
		this.userMap = {};
	}

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

const sessionMap = new SessionMap();
Object.freeze(sessionMap);

module.exports = sessionMap;
