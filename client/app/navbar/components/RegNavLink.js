import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, PseudoBox } from "@chakra-ui/core";

const NavLinkBig = ({ text, href }) => (
	<PseudoBox
		as={RouterLink}
		to={href}
		_hover={{ border: "2px solid #db85fa" }}
		rounded="md"
		p={1}
		px={2}
		border="2px solid transparent"
		transform="skew(-10deg)"
		bg="rgba(255, 255, 255, 0.3)"
		shadow="lgwhite"
		textDecoration="none"
		transition="border 0.15s ease"
	>
		<Text
			fontSize="lg"
			letterSpacing={3}
			color={{ md: "textWhite", base: "black" }}
			fontFamily="'Lato', sans-serif"
			fontWeight={{ base: "600", md: "500" }}
			textAlign="center"
		>
			{text}
		</Text>
	</PseudoBox>
);

const NavLinkMobile = ({ text, href, ...props }) => (
	<PseudoBox
		as={RouterLink}
		to={href}
		textDecoration="none"
		fontSize="lg"
		letterSpacing={3}
		color="black"
		fontFamily="'Lato', sans-serif"
		textAlign="center"
		width="100%"
		{...props}
	>
		{text}
	</PseudoBox>
);

const RegNavLink = props =>
	props.mobile ? <NavLinkMobile {...props} /> : <NavLinkBig {...props} />;

export default RegNavLink;
