import io from "socket.io-client";
import { SOCKET_HOST as host } from "../constants";

class socketAPI {
	constructor() {
		this.socket = undefined;
	}

	// Connect socket
	connect() {
		this.socket = io.connect(host);
		return new Promise((resolve, reject) => {
			this.socket.on("connect", () => {
				console.log("Socket connected yassss");
				resolve();
			});
			this.socket.on("connect_error", error => reject(error));
		});
	}

	// Disconnect socket
	disconnect() {
		return new Promise(resolve => {
			this.socket.disconnect(() => {
				this.socket = null;
				resolve();
			});
		});
	}

	emit(event, data) {
		return new Promise((resolve, reject) => {
			if (!this.socket) return reject("No socket connection.");

			return this.socket.emit(event, data, response => {
				if (response.error) {
					console.error(response.error);
					return reject(response.error);
				}

				return resolve();
			});
		});
	}

	on(event, fun) {
		return new Promise((resolve, reject) => {
			if (!this.socket) return reject("No socket connection.");

			this.socket.on(event, fun);
			resolve();
		});
	}
}

export default new socketAPI();
