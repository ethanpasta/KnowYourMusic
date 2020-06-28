import React from "react";
import { Box } from "@chakra-ui/core";
import Intro from "./components/Intro";
import MainContent from "./components/Main";

const HomeComponent = ({ user, playlists, game, startGame }) => {
	return (
		<Box flexGrow="2" d="flex" flexDirection="column" alignItems="center">
			<Intro
				h={{ base: "73vh", md: "72vh" }}
				d="flex"
				flexDirection="column"
				justifyContent="center"
				name={user.name}
			/>
			<MainContent user={user} playlists={playlists} game={game} startGame={startGame} />
		</Box>
	);
};

export default HomeComponent;
