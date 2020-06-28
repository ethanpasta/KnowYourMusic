import React from "react";
import { Text, Button, PseudoBox } from "@chakra-ui/core";

const StartGame = ({ action }) => (
	<PseudoBox
		className="glow-button"
		role="group"
		as={Button}
		w="50%"
		h="5em"
		borderRadius="5em"
		shadow="lg"
		bg="transparent"
		mt={8}
		minWidth="fit-content"
		cursor="pointer"
		onClick={() => action()}
	>
		<Text fontSize={{ base: "2xl", lg: "3xl" }} px={{ base: 2, lg: "0" }} fontWeight="800">
			<i>START GAME</i>
		</Text>
	</PseudoBox>
);

export default StartGame;
