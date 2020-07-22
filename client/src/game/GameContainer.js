import { connect } from "react-redux";
import GameComponent from "./GameComponent";
import { sendChoiceAndListen, updateLevel } from "./gameSlice";

const mapStateToProps = state => {
	const {
		data: { gameData: data, gameID: id },
		play: gameplay,
	} = state.game;
	return {
		data,
		gameplay,
		id,
	};
};

const mapDispatchToProps = {
	sendChoiceAndListen,
	updateLevel,
};

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

export default GameContainer;
