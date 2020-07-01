import { connect } from "react-redux";
import StartGame from "./Component";
import { listenForData } from "../../../../../game/gameSlice";

const mapStateToProps = state => ({
	stillLoading: state.game.loading,
});

const StartGameContainer = connect(mapStateToProps, { listenForData })(StartGame);

export default StartGameContainer;
