class GameCommunication {
	constructor(socket, answers) {
		this.socket = socket;
	}

	signalStart(data) {
		this.socket.emit("gameReady", data);
	}

	listen() {
		this.socket.on("submit", data => {});
	}
}

module.exports = GameCommunication;
