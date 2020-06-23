import React from "react";
import { Box } from "@chakra-ui/core";
import Intro from "./components/Intro";
import MainContent from "./components/Main";

const HomeComponent = ({ userName, playlists }) => {
	return (
		<Box flexGrow="2" d="flex" flexDirection="column" alignItems="center">
			<Intro
				h={{ base: "73vh", md: "72vh" }}
				d="flex"
				flexDirection="column"
				justifyContent="center"
				name={userName}
			/>
			<MainContent playlists={playlists} />
		</Box>
	);
};

export default HomeComponent;
