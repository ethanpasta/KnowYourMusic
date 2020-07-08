const GameData = require("./gameData");
const GameCommunication = require("./gameCommunication");
const { pino } = require("../../utils").logger;
const hri = require("human-readable-ids").hri;

class GameManager {
	constructor(user, socket) {
		this.gameData = new GameData(user);
		this.gameCommunication = new GameCommunication(socket);
		this.gameID = hri.random();
		this.start();
	}

	async start() {
		pino.info(">> Starting game..");
		// Only prep data if new game
		Object.keys(this.gameData.clientData).length === 0 &&
			(await this.gameData.prepAndGetData());
		console.log(this.gameData.answers);
		this.gameCommunication.signalStart({
			id: this.gameID,
			data: this.gameData.clientData,
		});
		this.gameCommunication.listenForAnswers(this.checkIfRight.bind(this));
	}

	checkIfRight(selection) {
		const { level, chosenOption } = selection;
		const levelAnswer = this.gameData.handleUserChoice(level, chosenOption);
		if (!levelAnswer) return;
		console.log(levelAnswer);
		pino.info(`>> Level #${level} - ${levelAnswer.levelPassed ? "right" : "wrong"} answer!`);
		this.gameCommunication.signalLevelAnswer({
			level,
			...levelAnswer,
		});
	}
}

module.exports = GameManager;
