import React, { useEffect } from "react";
import { Box } from "@chakra-ui/core";
import Intro from "./components/Intro";
import MainContent from "./components/Main";

const HomeComponent = ({
	user,
	playlists,
	gameLoading,
	connectSocket,
	disconnectSocket,
	listenForData,
}) => {
	useEffect(() => {
		if (!user.loading && user.loggedIn == true) {
			connectSocket();
			listenForData();
		}
		return () => !user.loading && user.loggedIn == true && disconnectSocket();
	}, [user.loggedIn]);
	return (
		<Box flexGrow="2" d="flex" flexDirection="column" alignItems="center">
			<Intro
				h={{ base: "73vh", md: "72vh" }}
				d="flex"
				flexDirection="column"
				justifyContent="center"
				name={user.name}
			/>
			<MainContent user={user} playlists={playlists} gameLoading={gameLoading} />
		</Box>
	);
};

export default HomeComponent;
