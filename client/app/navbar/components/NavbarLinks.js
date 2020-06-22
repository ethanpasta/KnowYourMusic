import React from "react";
import RegNavLink from "./RegNavLink";

const NavbarLinks = ({ routes, ...props }) => {
	return (
		<>
			{Object.keys(routes).map(route => (
				<RegNavLink key={route} text={route} href={routes[route]} {...props} />
			))}
		</>
	);
};

export default NavbarLinks;
