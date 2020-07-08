import { connect } from "react-redux";
import StartGame from "./StartGameComponent";

const mapStateToProps = state => ({
	gameID: state.game.data.gameID,
	gameReady: !state.game.data.loading,
});

const StartGameContainer = connect(mapStateToProps, null)(StartGame);

export default StartGameContainer;
