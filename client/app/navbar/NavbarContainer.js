import { connect } from "react-redux";
import NavbarComponent from "./NavbarComponent";

const mapStateToProps = state => {
	return {
		...state.user,
	};
};

const NavbarContainer = connect(mapStateToProps, null)(NavbarComponent);

export default NavbarContainer;
