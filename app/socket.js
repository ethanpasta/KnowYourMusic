const userMap = require("./services/userMap");

module.exports = function (sio) {
	sio.on("connection", socket => {
		const user = socket.request.session && socket.request.session.user;
		console.log("checking..." + user in userMap && userMap[user].socket);
		if (user in userMap && !userMap[user].socket) {
			console.log("user in usermap");
			userMap[user].socket = socket;
			console.log(userMap[user]);
		}
		socket.on("disconnect", () => console.log("Someone disconnected"));
	});
};
