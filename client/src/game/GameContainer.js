import { connect } from "react-redux";
import GameComponent from "./GameComponent";
import { sendChoiceAndListen, updateLevel } from "./gameSlice";

const mapStateToProps = state => {
	const { game } = state;
	return {
		data: game.data.gameData,
		gameplay: game.play,
	};
};

const mapDispatchToProps = {
	sendChoiceAndListen,
	updateLevel,
};

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

export default GameContainer;
