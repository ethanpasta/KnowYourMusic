import React from "react";
import { Heading } from "@chakra-ui/core";

const Countdown = ({ counter }) => (
	<Heading pos="absolute" top="50%" left="50%" fontSize="4xl">
		{counter}
	</Heading>
);

export default Countdown;
