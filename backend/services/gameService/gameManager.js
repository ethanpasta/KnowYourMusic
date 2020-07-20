const GameData = require("./gameData");
const GameCommunication = require("./gameCommunication");
const { pino } = require("../../utils").logger;
const hri = require("human-readable-ids").hri;

/** Class manages a single game instance */
class GameManager {
	constructor(user, socket) {
		this.gameData = new GameData(user);
		this.gameCommunication = new GameCommunication(socket);
		// The id of this game
		this.gameID = hri.random();
		this.start();
	}

	/** Prepares and starts the game */
	async start() {
		pino.info(">> Starting game..");
		// Only prep data if new game
		Object.keys(this.gameData.clientData).length === 0 &&
			(await this.gameData.prepAndGetData());
		console.log(this.gameData.answers);
		// Signal game start on socket
		this.gameCommunication.signalStart({
			id: this.gameID,
			data: this.gameData.clientData,
		});
		// Wait for user level submissions
		this.gameCommunication.listenForAnswers(this.checkIfRight.bind(this));
	}

	/**
	 * Handle user submission.
	 * Emit an object containting true or false if the level was passed, and the correct option
	 */
	checkIfRight(selection) {
		const { level, chosenOption } = selection;
		const levelAnswer = this.gameData.handleUserChoice(level, chosenOption);
		if (!levelAnswer) {
			this.gameCommunication.signalLevelAnswer({
				error: "Level already played",
			});
			return;
		}
		pino.info(`>> Level #${level} - ${levelAnswer.levelPassed ? "passed" : "failed"}!`);
		this.gameCommunication.signalLevelAnswer({
			level,
			...levelAnswer,
		});
	}
}

module.exports = GameManager;
