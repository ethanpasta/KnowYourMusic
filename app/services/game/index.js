const GameData = require("./gameData");
const { pino } = require("../../utils").logger;

class GameManager {
	constructor(user, socket) {
		this.gameData = new GameData(user);
		this.socket = socket;
		pino.info("Now were supposed to prep game data and start!");
		/* this.start(); */
	}

	async start() {
		pino.info(">> Prepping game data..");
		await this.gameData.prepAndGetData();
		pino.info(">> Emitting game ready event");
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

	deleteSocket() {
		this.socket.disconnect();
		this.socket = undefined;
	}
}

module.exports = GameManager;
