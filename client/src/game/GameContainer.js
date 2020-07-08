import { connect } from "react-redux";
import GameComponent from "./GameComponent";
import { signalChoice, listenForLevelResponse, updateLevel } from "./gameSlice";

const mapStateToProps = state => {
	const { game } = state;
	return {
		state: {
			loading: game.data.loading,
			data: game.data.gameData,
			progress: game.progress,
		},
	};
};

const mapDispatchToProps = {
	signalChoice,
	listenForLevelResponse,
	updateLevel,
};

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

export default GameContainer;
