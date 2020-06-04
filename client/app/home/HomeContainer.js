import { connect } from "react-redux";
import HomeComponent from "./HomeComponent";

import { getAccountInfo } from "./duck";

const mapStateToProps = state => {
	const { fetchingAccount, data, error } = state.account;
	return {
		fetchingAccount,
		data,
		error,
	};
};

const mapDispatchToProps = dispatch => {
	const fetchAccountInfo = () => {
		dispatch(getAccountInfo());
	};
	return { fetchAccountInfo };
};

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);

export default NavbarContainer;
