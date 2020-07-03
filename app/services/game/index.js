const GameData = require("./gameData");
const { pino } = require("../../utils").logger;

class GameManager {
	constructor(user, socket) {
		this.gameData = new GameData(user);
		this.socket = socket;
		this.start();
	}

	async start() {
		pino.info(">> Starting game..");
		// Only prep data if new game
		Object.keys(this.gameData.clientData).length === 0 &&
			(await this.gameData.prepAndGetData());
		pino.info(">> Emitting game ready event");
		console.log(this.socket);
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

module.exports = GameManager;
