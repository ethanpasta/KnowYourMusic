const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		validate: {
			validator: value => User.countDocuments({ username: value }).then(count => count == 0),
			message: props => `Username ${props.value} already exists`,
		},
	},
	display_name: String,
	access_token: String,
	refresh_token: String,
	updated_at: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongoose.model("users", userSchema);

module.exports = User;
