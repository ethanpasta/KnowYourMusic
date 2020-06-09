import React, { useState, useEffect } from "react";
import { Box, Flex, PseudoBox, Image, Text, Button, Skeleton } from "@chakra-ui/core";

const PlayListGrid = ({ loading, data }) => {
	return (
		<Flex
			align="center"
			flexBasis={{ lg: "40%", md: "50%" }}
			wrap="wrap"
			justify="center"
			zIndex="1"
		>
			{Object.keys(data || []).map(i => (
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
					{/* <Skeleton isLoaded={!loading}> */}
					<Image
						src={data[i]}
						objectFit="contain"
						w={{ lg: "70%", md: "90%" }}
						rounded="lg"
						shadow="lg"
					></Image>
					{/* </Skeleton> */}
				</PseudoBox>
			))}
		</Flex>
	);
};

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
						<>
							<Text fontSize="3xl">Login with Spotify</Text>
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
						</>
					)}
				</PseudoBox>
			</Flex>
		</Skeleton>
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
			<SpotifyLogin {...user} />
			<PlayListGrid {...playlists} />
		</Box>
	);
};

export default HomeContainer;
