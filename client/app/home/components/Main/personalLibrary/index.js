import React from "react";
import { Box, Heading, Skeleton } from "@chakra-ui/core";
import SpotifyLogin from "./SpotifyLogin";
import StartGame from "./StartGame";
import "./style.scss";

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
