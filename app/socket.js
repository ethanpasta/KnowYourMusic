const userMap = require("./services/userMap");
const { pino } = require("./utils").logger;
const GameManager = require("./services/game");

function socketInit(sio) {
	sio.on("connection", socket => {
		const user = socket.request.session && socket.request.session.user;
		if (user in userMap && userMap[user].gameManager === undefined) {
			pino.info(`Connecting socket '${socket.id}' for user '${user}'`);
			userMap[user].gameManager = new GameManager(user, socket);
		}
		socket.on("disconnect", () => {
			pino.info(`Disconnecting socket #${socket.id} for user ${user}`);
			userMap[user] && userMap[user].gameManager.deleteSocket();
		});
	});
}

module.exports = socketInit;
