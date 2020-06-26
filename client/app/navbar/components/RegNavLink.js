import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, PseudoBox } from "@chakra-ui/core";

const desktopLinkStyle = {
	rounded: "md",
	border: "2px solid transparent",
	transform: "skew(-10deg)",
	transition: "all 0.15s ease",
};

const NavbarLink = ({ text, href, mobile }) => (
	<PseudoBox
		as={RouterLink}
		to={href}
		textDecoration="none"
		textTransform="uppercase"
		fontFamily="'Lato', sans-serif"
		textAlign="center"
		color="textBlack"
		letterSpacing={3}
		fontSize="lg"
		width={mobile ? "100%" : "auto"}
		_hover={!mobile && { transform: "translateY(-.1em) skew(-10deg)", shadow: "xl" }}
		rounded="md"
		shadow={!mobile ? "lg" : "none"}
		px={mobile ? "0" : 2}
		py={mobile ? 5 : 1}
		{...(mobile ? {} : desktopLinkStyle)}
	>
		{text}
	</PseudoBox>
);

export default NavbarLink;
