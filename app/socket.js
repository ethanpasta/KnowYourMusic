const userMap = require("./services/userMap");
const { pino } = require("./utils").logger;

function socketInit(sio) {
	sio.on("connection", socket => {
		const user = socket.request.session && socket.request.session.user;
		if (user in userMap && userMap[user].socket === undefined) {
			pino.info(`Connecting socket '${socket.id}' for user '${user}'`);
			userMap[user].socket = socket;
		}
		socket.on("disconnect", () => {
			pino.info(`Socket #${socket.id} disconnected for user ${user}`);
			userMap[user] && delete userMap[user].socket;
		});
	});
}

module.exports = socketInit;
