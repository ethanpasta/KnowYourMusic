import { connect } from "react-redux";
import HomeComponent from "./HomeComponent";

const mapStateToProps = state => {
	const { user, playlists } = state;
	return {
		user,
		playlists,
	};
};

const HomeContainer = connect(mapStateToProps, null)(HomeComponent);

export default HomeContainer;
