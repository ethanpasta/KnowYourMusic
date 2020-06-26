import { connect } from "react-redux";
import HomeComponent from "./HomeComponent";

const mapStateToProps = state => {
	const { user, playlists } = state;
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
	};
};

const HomeContainer = connect(mapStateToProps, null)(HomeComponent);

export default HomeContainer;
