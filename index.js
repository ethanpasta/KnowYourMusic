const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const sio = io.of("/game");
require("./app/middleware")(app, sio);
require("./app/socket")(sio);
require("./app/database");
require("dotenv").config();

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
