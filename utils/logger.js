const pino = require("pino")();
const expressPino = require("express-pino-logger")({
	logger: pino,
});

module.exports = {
	pino,
	expressPino,
};
