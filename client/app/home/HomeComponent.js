import React, { useState, useEffect } from "react";
import { Box, Flex, PseudoBox, Text, Button, Skeleton, Heading, Icon } from "@chakra-ui/core";
import PlayListGrid from "./Playlists";
import SpotifyButton from "../shared/SpotifyButton";
import "./style.css";

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

const Description = ({ name }) => {
	return (
		<Flex direction="column" justify="space-around" align="center" height="70%">
			<Box
				color="#f4f6ff"
				textAlign="center"
				fontFamily="'Lato', sans-serif"
				fontWeight="700"
				letterSpacing="0.5px"
				px={5}
			>
				<Text fontSize={{ md: "6xl", base: "3xl" }} pb={{ sm: 2 }}>
					{name ? `Hey ${name}, i` : "I"}t&apos;s simple.
				</Text>
				<Text fontSize={{ md: "2xl", base: "lg" }}>
					You want to memorize more song lyrics. <i>We all do.</i>
				</Text>
				<Text fontSize={{ md: "2xl", base: "lg" }} pb={{ sm: 4 }}>
					You have 2 options...
				</Text>
				<Text fontSize={{ md: "xl", base: "md" }}>
					Read song lyrics over and over and probably forget them the day after
				</Text>
				<Text fontSize={{ md: "md", base: "sm" }} pt={1}>
					<i>— OR —</i>
				</Text>
				<Text fontSize={{ md: "2xl", base: "lg" }} pt={2} color="#db85fa" fontWeight="700">
					PLAY THIS GAME
				</Text>
			</Box>
			<Box
				color="gray.200"
				textAlign="center"
				fontFamily="'Lato', sans-serif"
				fontWeight="400"
				letterSpacing="0.5px"
			>
				{/* <Icon name="chevron-down" size="40px" color="white" /> */}
				<Box className="section1">
					<Text
						fontFamily="'Lato', sans-serif"
						fontWeight="700"
						as="a"
						href="#section1"
						textDecoration="none"
						color="gray.200"
						fontSize="xl"
					>
						scroll down<span></span>
						<span></span>
						<span></span>
					</Text>
				</Box>
			</Box>

			{/* <Text fontSize="2xl">
					Either log in with your Spotify account, and play with your personalized
					library. <br />
					Or, play with one of the public Spotify playlists.
				</Text>
				<Text fontSize="2xl">It&apos;s up to you.</Text> */}
		</Flex>
	);
};

const HomeContainer = ({ user, playlists }) => {
	return (
		<Box
			flexGrow="1"
			flexShrink="1"
			d="flex"
			alignItems="center"
			justifyContent="center"
			flexWrap="wrap"
		>
			<Description
				name={
					user.loading
						? false
						: user.loggedIn
						? user.user.display_name.split(" ")[0]
						: false
				}
			/>
			{/* <SpotifyLogin {...user} />
			<PlayListGrid {...playlists} /> */}
		</Box>
	);
};

export default HomeContainer;
