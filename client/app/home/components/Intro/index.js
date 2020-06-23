import React from "react";
import { Box } from "@chakra-ui/core";
import IntroContent from "./IntroContent";

const Intro = ({ name, ...props }) => {
	return (
		<Box pos="relative" w={{ base: "80%", md: "70%", lg: "55%", xl: "38%" }} {...props}>
			<IntroContent name={name} />
		</Box>
	);
};

export default Intro;
