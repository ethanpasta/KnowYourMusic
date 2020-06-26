import React from "react";
import { Box, Text, Heading, Button, PseudoBox, Skeleton } from "@chakra-ui/core";
import SpotifyButton from "../../../shared/SpotifyButton";
import "./style.scss";

const SpotifyLogin = () => (
	<>
		<Text
			fontSize={{ base: "lg", md: "xl" }}
			color={{ base: "textBlack", lg: "textWhite" }}
			py={6}
			m={{ base: "0 auto" }}
			w="90%"
		>
			If you log in with your Spotify account, the game will be personalized and you can play
			with your own songs! Also, all of your previous game history will be stored.
		</Text>
		<SpotifyButton giant={true} m="0 auto" mb={6} />
	</>
);

const StartGame = () => (
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
	>
		<Text fontSize={{ base: "2xl", lg: "3xl" }} px={{ base: 2, lg: "0" }} fontWeight="800">
			<i>START GAME</i>
		</Text>
	</PseudoBox>
);

const PersonalLibrary = ({ loggedIn, loading }) => (
	<Box
		alignSelf="center"
		w={["90%", "80%", "80%", "35%"]}
		textAlign="center"
		rounded="lg"
		bg={{ base: loggedIn ? "transparent" : "ghostWhite", lg: "transparent" }}
	>
		<Heading
			fontSize="2em"
			fontWeight="900"
			textTransform="uppercase"
			borderTopLeftRadius="lg"
			borderTopRightRadius="lg"
			rounded={loggedIn ? "lg" : "none"}
			w="full"
			bg={{ base: loggedIn ? "textBlack" : "#1DB954", lg: "transparent" }}
			color={{ base: loggedIn ? "#1DB954" : "textBlack", lg: "#1DB954" }}
			m="0"
			py={{ base: 4, lg: "0" }}
		>
			<Box px={4}>Play with your Spotify library</Box>
		</Heading>
		<Skeleton isLoaded={!loading}>{loggedIn ? <StartGame /> : <SpotifyLogin />}</Skeleton>
	</Box>
);

export default PersonalLibrary;
