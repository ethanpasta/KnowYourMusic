import { connect } from "react-redux";
import HomeComponent from "./HomeComponent";
import { listenForData, connectSocket, disconnectSocket } from "../services/socket/socketSlice";
import { fetchPlaylistsData } from "./homeSlice/playlists";
import { fetchUserAccount } from "./homeSlice/user";

const mapStateToProps = state => {
	const { user, playlists, socket } = state;
	return {
		state: {
			user: {
				loading: user.loading,
				loggedIn: user.loggedIn,
				name: user.loggedIn ? user.profile.display_name.split(" ")[0] : undefined,
			},
			playlists,
			socket,
		},
	};
};

const mapDispatchToProps = {
	connectSocket,
	disconnectSocket,
	listenForData,
	fetchPlaylistsData,
	fetchUserAccount,
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
