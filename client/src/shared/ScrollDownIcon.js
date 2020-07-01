import React from "react";
import { Box, Text } from "@chakra-ui/core";
import "./style.scss";

const arrowStyle = {
	borderLeft: "2px",
	borderLeftColor: "gray.600",
	borderBottom: "2px",
	borderBottomColor: "gray.600",
};

const ScrollDown = () => {
	return (
		<Box className="section1">
			<Box as="a" href="#section1">
				<Box {...arrowStyle}></Box>
				<Box {...arrowStyle}></Box>
				<Box {...arrowStyle}></Box>
			</Box>
		</Box>
	);
};

export default ScrollDown;
