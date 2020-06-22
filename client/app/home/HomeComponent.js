import React, { useState, useEffect } from "react";
import { Flex, PseudoBox, Text, Button, Skeleton, Spinner, Box } from "@chakra-ui/core";
import PlayListGrid from "./components/playlists/Playlists";
import SpotifyButton from "../shared/SpotifyButton";
import "./style.css";
import NewUser from "./components/newUser";

const SpotifyLogin = ({ loading, loggedIn, user, error }) => {
	return (
		<Skeleton isLoaded={!loading}>
			<Flex justify="center" flexBasis="50%">
				<PseudoBox
					borderWidth="1px"
					rounded="lg"
					overflow="hidden"
					backgroundColor="rgba(255, 255, 255, 0.6)"
					shadow="md"
					size="sm"
					position="relative"
					d="flex"
					justifyContent="space-evenly"
					flexDirection="column"
					alignItems="center"
					z-index="1"
				>
					{loggedIn ? (
						<>
							<Text fontSize="3xl">Hey, {user.display_name}</Text>
							<Button
								variantColor="teal"
								size="lg"
								variant="solid"
								border="none"
								cursor="pointer"
							>
								Start Game!
							</Button>
						</>
					) : (
						<SpotifyButton />
					)}
				</PseudoBox>
			</Flex>
		</Skeleton>
	);
};

const HomeContainer = ({ user, playlists, ...props }) => {
	const firstName = user.loading || (user.loggedIn && user.user.display_name.split(" ")[0]);
	return <NewUser loading={user.loading} playlists={playlists} {...props} />;
};

export default HomeContainer;
