import React from "react";
import { Box, Text, Heading } from "@chakra-ui/core";
import SpotifyButton from "../../../shared/SpotifyButton";

const SpotifyLogin = () => {
	return (
		<Box
			alignSelf="center"
			w={{ base: "80%", md: "70%", lg: "30%" }}
			textAlign="center"
			bg={{ base: "rgba(255, 255, 255, 0.9)", md: "transparent" }}
			rounded={{ base: "lg", md: "none" }}
			shadow={{ base: "lg", md: "none" }}
			py={{ base: 1, md: "0" }}
			mb={{ base: 32, lg: "0" }}
		>
			<Heading
				my={0}
				pt={1}
				pb={3}
				fontSize="2em"
				fontWeight="900"
				color={{ base: "#2e3b4c", md: "#1DB954" }}
				textTransform="uppercase"
			>
				Play with your Spotify library
			</Heading>
			<Text
				fontSize={{ base: "lg", md: "xl" }}
				color={{ base: "#2e3b4c", md: "textWhite" }}
				pb={5}
				m={{ base: "0 auto" }}
				w={{ base: "80%", md: "100%" }}
			>
				If you log in with your Spotify account, the game will be personalized and you can
				play with your own songs! <br />
				Also, all of your previous game history will be stored.
			</Text>
			<SpotifyButton giant={true} m="0 auto" />
		</Box>
	);
};

export default SpotifyLogin;
