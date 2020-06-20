import React from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/core";
import Description from "../Description";
import SpotifyButton from "../../../shared/SpotifyButton";
import PlayListGrid from "../playlists/Playlists";

const ScrollDown = ({ scrolled }) => {
	return (
		<Box
			className="section1"
			opacity={scrolled ? "0" : "1"}
			transition="opacity 1s ease"
			d={{ base: "none", md: "block" }}
		>
			<Text
				fontWeight="200"
				as="a"
				href="#section1"
				textDecoration="none"
				color="gray.200"
				fontSize="md"
			>
				SCROLL DOWN<span></span>
				<span></span>
				<span></span>
			</Text>
		</Box>
	);
};

const Login = () => {
	return (
		<Box
			alignSelf="center"
			w={{ base: "80%", md: "30%" }}
			textAlign="center"
			bg={{ base: "rgba(255, 255, 255, 0.9)", md: "transparent" }}
			rounded={{ base: "lg", md: "none" }}
			shadow={{ base: "lg", md: "none" }}
			py={{ base: 1, md: "0" }}
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

const NewUser = ({ playlists }) => (
	<Box
		flexGrow="2"
		d="flex"
		flexDirection="column"
		height={{ md: "85vh" }}
		mt={{ base: "30%", md: "0" }}
		alignItems="center"
		justifyContent="center"
	>
		<Description pb={{ base: "15%", md: "0" }} mt="auto" />
		<Box
			mt="auto"
			d="flex"
			flexDirection={{ base: "column", md: "row" }}
			justifyContent="space-around"
			w="100%"
		>
			<Login />
			<PlayListGrid {...playlists} mb="2em" />
		</Box>
	</Box>
);

export default NewUser;
