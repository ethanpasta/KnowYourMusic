import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Text } from "@chakra-ui/core";

const RegNavLink = ({ text, href }) => (
	<Link
		as={RouterLink}
		to={href}
		_hover={{ textDecoration: "none", border: "2px solid #db85fa" }}
		fontWeight="500"
		textAlign="center"
		rounded="md"
		p={1}
		px={2}
		border="2px solid transparent"
		transform="skew(-10deg)"
		bg="rgba(255, 255, 255, 0.3)"
		shadow="lgwhite"
	>
		<Text fontSize="lg" letterSpacing={3} color="textWhite" fontFamily="'Lato', sans-serif">
			{text}
		</Text>
	</Link>
);

export default RegNavLink;
