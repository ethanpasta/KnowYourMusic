import React from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/core";
import SpotifyLogin from "./SpotifyLogin";
import PlayListGrid from "../playlists/Playlists";
import Intro from "../Intro";

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

const NewUser = ({ playlists, scrolled, handleScrollEvent }) => (
	<Box flexGrow="2" d="flex" flexDirection="column" alignItems="center">
		<Intro
			h={{ base: "73vh", md: "72vh" }}
			d="flex"
			flexDirection="column"
			justifyContent="center"
			handleScrollEvent={handleScrollEvent}
		/>
		<Box
			d="flex"
			mt={{ base: "10vh", lg: "5vh" }}
			mb={{ base: "10vh", lg: "10vh" }}
			flexDirection={{ base: "column", lg: "row" }}
			justifyContent="space-around"
			w="100%"
			opacity={scrolled ? "1" : "0"}
			transition="opacity 0.5s ease"
		>
			<SpotifyLogin />
			<PlayListGrid {...playlists} />
		</Box>
	</Box>
);

export default NewUser;
