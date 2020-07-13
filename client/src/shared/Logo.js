import React, { useState } from "react";
import { Box } from "@chakra-ui/core";
import "./style.scss";
import useScrollPosition from "./useScrollPosition";

const Logo = ({ small }) => {
	const [scrolled, setScrolled] = useState(false);
	useScrollPosition(({ currPos }) => {
		!small && setScrolled(currPos.y > 10);
	}, true);
	return (
		<Box
			zIndex="2"
			position="fixed"
			top={scrolled || small ? ".5rem" : "1rem"}
			left="1rem"
			className={`logoText${scrolled || small ? " smaller" : ""}`}
			fontFamily="Spartan, sans-serif"
			fontSize={{ base: "2.5rem", md: "3.5rem", lg: "3.5rem", xl: "4rem" }}
			fontWeight="800"
			letterSpacing="-1px"
			lineHeight="0.95"
			transition="transform .5s ease"
			transform={scrolled ? "scale(0.3)" : "none"}
			transformOrigin="top left"
		>
			know
			<br />
			your
			<br />
			music.
		</Box>
	);
};

export default Logo;
