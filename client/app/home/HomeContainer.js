import { connect } from "react-redux";
import HomeComponent from "./HomeComponent";

const mapStateToProps = state => {
	const { user, playlists } = state;
	return {
		userName: user.loading ? false : user.loggedIn && user.user.display_name.split(" ")[0],
		playlists,
	};
};

const HomeContainer = connect(mapStateToProps, null)(HomeComponent);

export default HomeContainer;
