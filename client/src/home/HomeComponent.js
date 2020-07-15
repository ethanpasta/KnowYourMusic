import React, { useEffect } from "react";
import { Box } from "@chakra-ui/core";
import Intro from "./components/Intro";
import MainContent from "./components/Main";
import BackgroundSVG from "../shared/BackgroundSVG";
import "./style.css";

const HomeComponent = ({ state, ...actions }) => {
	useEffect(() => {
		actions.fetchUserAccount();
		actions.fetchPlaylistsData();
	}, []);
	useEffect(() => {
		if (!state.user.loading && state.user.loggedIn == true) actions.connectSocket();
	}, [state.user.loggedIn]);
	useEffect(() => {
		if (state.socket.connected) actions.listenForData();
	}, [state.socket.connected]);
	return (
		<Box className="home-root">
			<BackgroundSVG />
			<Box flexGrow="2" d="flex" flexDirection="column" alignItems="center">
				<Intro
					h={{ base: "73vh", md: "72vh" }}
					d="flex"
					flexDirection="column"
					justifyContent="center"
					name={state.user.name}
				/>
				<MainContent user={state.user} playlists={state.playlists} />
			</Box>
		</Box>
	);
};

export default HomeComponent;
