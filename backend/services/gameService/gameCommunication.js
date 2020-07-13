const { pino } = require("../../utils").logger;

/** Class handles all communication with the client through a socket */
class GameCommunication {
	constructor(socket) {
		this.socket = socket;
	}

	signalStart(data) {
		pino.info(">> Emitting game ready event");
		this.socket.emit("game_ready", data);
	}

	listenForAnswers(callback) {
		this.socket.on("submit_level", data => {
			callback(data);
		});
	}

	signalLevelAnswer(answer) {
		this.socket.emit("level_response", answer);
	}
}

module.exports = GameCommunication;
