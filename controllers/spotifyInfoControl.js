const { pino } = require("../utils/logger");

const getMe = (req, res) => {
	const myApi = req.api;
	myApi
		.getMe()
		.then(data => res.send(data.body))
		.catch(err => {
			pino.error("Something went wrong!", err);
			res.send({ err });
		});
};

module.exports = { getMe };
