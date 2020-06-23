import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, PseudoBox } from "@chakra-ui/core";

const desktopLinkStyle = {
	rounded: "md",
	border: "2px solid transparent",
	transform: "skew(-10deg)",
	transition: "border 0.15s ease",
};

const NavbarLink = ({ text, href, mobile, scrolled }) => (
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
		_hover={!mobile && { borderWidth: "2px", borderColor: "rgba(255, 255, 255, 0.3)" }}
		rounded="md"
		shadow={!mobile && !scrolled ? "lg" : "none"}
		px={mobile ? "0" : 2}
		py={mobile ? 5 : 1}
		{...(mobile ? {} : desktopLinkStyle)}
	>
		{text}
	</PseudoBox>
);

export default NavbarLink;
