const GameData = require("./gameData");
const { pino } = require("../../utils").logger;

class UserGame {
	constructor(username) {
		this.username = username;
		this.gameData = new GameData(username);
	}

	async getClientData() {
		await this.gameData.prepAndGetData();
		return this.gameData.clientData;
	}
}

module.exports = UserGame;
