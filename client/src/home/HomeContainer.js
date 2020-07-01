import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomeComponent from "./HomeComponent";
import { listenForData, connectSocket, disconnectSocket } from "../game/gameSlice";
import { fetchPlaylistsData, fetchUserAccount } from "./homeSlice";

const mapStateToProps = state => {
	const { user, playlists, game } = state;
	return {
		state: {
			user: {
				loading: user.loading,
				loggedIn: user.loggedIn,
				name: user.loggedIn ? user.profile.display_name.split(" ")[0] : undefined,
			},
			playlists,
			gameLoading: game.loading,
		},
	};
};

const mapDispatchToProps = dispatch => ({
	actions: {
		connectSocket: bindActionCreators(connectSocket, dispatch),
		disconnectSocket: bindActionCreators(disconnectSocket, dispatch),
		listenForData: bindActionCreators(listenForData, dispatch),
		fetchPlaylistsData: bindActionCreators(fetchPlaylistsData, dispatch),
		fetchUserAccount: bindActionCreators(fetchUserAccount, dispatch),
	},
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
