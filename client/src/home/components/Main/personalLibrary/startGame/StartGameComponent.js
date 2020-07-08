import React, { useState, useEffect } from "react";
import { Text, Button, PseudoBox, Spinner } from "@chakra-ui/core";
import { Redirect } from "react-router-dom";

const StartGame = ({ gameReady, gameID }) => {
	const [loading, setLoading] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (clicked && gameReady) setRedirect(true);
	}, [gameReady]);

	const handleClick = () => {
		if (gameReady) {
			setLoading(true);
			setTimeout(() => setRedirect(true), 1500);
		} else {
			setLoading(true);
			setClicked(true);
		}
	};

	return redirect ? (
		<Redirect to={`/game/${gameID}`} />
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
			{loading ? (
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
