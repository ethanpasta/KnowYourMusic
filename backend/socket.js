const { sessionMap } = require("./services/userService");
const { pino } = require("./utils").logger;
const GameManager = require("./services/gameService");

function socketInit(sio) {
	sio.on("connection", socket => {
		let user =
			socket.request.session &&
			socket.request.session.user &&
			sessionMap.getUser(socket.request.session.user);
		if (!user) {
			pino.error(">> SOCKET_ERROR: no user session exists");
			return;
		}
		pino.info(`Connecting socket '${socket.id}' for user '${socket.request.session.user}'`);
		user.setGameManager(new GameManager(user.id, socket));
		socket.on("disconnect", () => {
			pino.info(`Disconnecting socket #${socket.id} for user ${user}`);
		});
	});
}

module.exports = socketInit;
