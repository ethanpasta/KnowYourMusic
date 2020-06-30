import { connect } from "react-redux";
import HomeComponent from "./HomeComponent";
import { listenForData, connectSocket, disconnectSocket } from "../game/gameSlice";

const mapStateToProps = state => {
	const { user, playlists, game } = state;
	return {
		user: {
			loading: user.loading,
			loggedIn: user.loggedIn,
			name: user.loading
				? undefined
				: user.loggedIn
				? user.profile.display_name.split(" ")[0]
				: false,
		},
		playlists,
		gameLoading: game.loading,
	};
};

const mapDispatchToProps = {
	connectSocket,
	disconnectSocket,
	listenForData,
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
