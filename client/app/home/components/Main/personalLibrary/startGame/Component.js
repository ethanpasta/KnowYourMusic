import React, { useState, useEffect } from "react";
import { Text, Button, PseudoBox, Spinner } from "@chakra-ui/core";
import { Redirect } from "react-router-dom";

const StartGame = ({ stillLoading, listenForData }) => {
	const [ready, setReady] = useState(false);
	const [clicked, setClicked] = useState(false);
	useEffect(() => {
		if (clicked && !stillLoading) {
			setReady(true);
		}
	}, [stillLoading]);
	const handleClick = () => {
		setClicked(true);
		listenForData();
	};

	return ready && clicked ? (
		<Redirect to="/game" />
	) : (
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
			onClick={handleClick}
		>
			{clicked ? (
				<Spinner />
			) : (
				<Text
					fontSize={{ base: "2xl", lg: "3xl" }}
					px={{ base: 2, lg: "0" }}
					fontWeight="800"
				>
					<i>START GAME</i>
				</Text>
			)}
		</PseudoBox>
	);
};

export default StartGame;
