const GameData = require("./gameData");
const userMap = require("../userMap");
const { pino } = require("../../utils").logger;

class UserGame {
	constructor(username) {
		this.username = username;
		this.gameData = new GameData(username);
		this.socket = userMap[username].socket;
	}

	async start() {
		pino.info("Prepping game..");
		await this.gameData.prepAndGetData();
		pino.info(`Informing ${this.username} that game is ready`);
		this.emitStart();
		this.listen();
	}

	emitStart() {
		this.socket.emit("game_ready", this.gameData.clientData);
	}

	listen() {
		this.socket.on("submit", data => {
			const level = data.level;
			const chosenOption = data.chosen;
			const correctOption = this.gameData.answers[level] == chosenOption;
			pino.info(`>> Level #${level} - ${correctOption ? "correct" : "wrong"} answer!`);
			this.socket.emit("response", correctOption);
		});
	}
}

module.exports = UserGame;
