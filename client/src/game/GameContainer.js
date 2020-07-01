import { connect } from "react-redux";
import GameComponent from "./GameComponent";

const mapStateToProps = state => ({
	data: state.game.gameData,
});

const GameContainer = connect(mapStateToProps, null)(GameComponent);

export default GameContainer;
