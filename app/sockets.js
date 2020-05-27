const userMap = require("./services/userMap");

module.exports = function (sio) {
	sio.on("connection", socket => {
		console.log(`User connected. Socket: ${socket.id}`);
		const user = socket.request.session && socket.request.session.user;
		if (user in userMap && !userMap[user].socketId) {
			userMap[user].socketId = socket.id;
		}
		socket.on("disconnect", () => console.log("Someone disconnected"));
	});
};
