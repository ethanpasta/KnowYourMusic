import React, { useState, useEffect } from "react";
import { Box, Flex, PseudoBox, Image, Text, Button } from "@chakra-ui/core";

const PlayListGrid = ({ playlists }) => {
	return (
		<Flex
			align="center"
			flexBasis={{ lg: "40%", md: "50%" }}
			wrap="wrap"
			justify="center"
			zIndex="1"
		>
			{Object.keys(playlists.data || []).map(i => (
				<PseudoBox
					key={i}
					cursor="pointer"
					flexBasis="40%"
					d="flex"
					justifyContent={{
						lg: i % 2 == 0 ? "flex-end" : "flex-start",
						sm: "center",
					}}
					mx={5}
					my={3}
				>
					<Image
						src={playlists.data[i]}
						objectFit="contain"
						w={{ lg: "70%", md: "90%" }}
						rounded="lg"
						shadow="lg"
					></Image>
				</PseudoBox>
			))}
		</Flex>
	);
};

const SpotifyLogin = () => {
	return (
		<Flex justify="center" flexBasis="50%">
			<PseudoBox
				borderWidth="1px"
				rounded="lg"
				overflow="hidden"
				backgroundColor="rgba(255,182,193, 0.5)"
				shadow="md"
				w={["lg", "md", "sm"]}
				h={["lg", "md", "sm"]}
				position="relative"
				d="flex"
				justifyContent="space-evenly"
				flexDirection="column"
				alignItems="center"
				px={5}
				z-index="1"
			>
				<Text fontSize="4xl">Login with Spotify</Text>
				<PseudoBox cursor="pointer">
					<Button
						w="100px"
						h="60px"
						as="a"
						href="/auth"
						bgImage="url('https://www.scdn.co/i/_global/open-graph-default.png')"
						bgSize="cover"
						bgPos="center"
					></Button>
				</PseudoBox>
			</PseudoBox>
		</Flex>
	);
};

const HomeContainer = ({ user, playlists }) => {
	return (
		<Box
			flexGrow="1"
			flexShrink="1"
			d="flex"
			pt="4%"
			alignItems="center"
			justifyContent="space-evenly"
		>
			<SpotifyLogin account={user} />
			<PlayListGrid playlists={playlists} />
		</Box>
	);
};

export default HomeContainer;
