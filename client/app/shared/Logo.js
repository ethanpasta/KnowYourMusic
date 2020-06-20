import React from "react";
import { Text, Box } from "@chakra-ui/core";
import "./style.scss";

const spanStyle = {
	display: "block",
	transition: "transform 0.5s ease",
};

const transform = "scale(0.5)";

const Logo = ({ scrolled }) => (
	<Box
		className={`logoText ${scrolled ? "" : "animate"}`}
		fontFamily="Spartan, sans-serif"
		fontSize={{ base: "2.5rem", md: "3.5rem", lg: "3.5rem", xl: "4rem" }}
		fontWeight="800"
		letterSpacing="-1px"
		lineHeight="0.95"
	>
		<Box style={spanStyle} transform={scrolled ? transform : "none"} transformOrigin="top left">
			know
			<br />
			your
			<br />
			music.
		</Box>
	</Box>
);

export default Logo;
