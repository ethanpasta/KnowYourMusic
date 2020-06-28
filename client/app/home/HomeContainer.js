import { connect } from "react-redux";
import { startGameAction } from "./homeState";
import HomeComponent from "./HomeComponent";

const mapStateToProps = state => {
	const { user, playlists, game } = state;
	return {
		user: {
			loading: user.loading,
			loggedIn: user.loggedIn,
			name: user.loading
				? undefined
				: user.loggedIn
				? user.user.display_name.split(" ")[0]
				: false,
		},
		playlists,
		game,
	};
};

const mapDispatchToProps = {
	startGame: startGameAction,
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
