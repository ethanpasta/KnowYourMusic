import React, { useState, useEffect } from "react";
import ExistingUser from "./ExistingUser";
import NewUser from "./NewUser";
import { Box } from "@chakra-ui/core";

const playlistBackgrounds = [
	"https://66.media.tumblr.com/486d3bad2798e90c93463f35aab125d9/tumblr_pqn0951d9u1u4k328o1_400.jpg",
	"https://data.whicdn.com/images/295426049/original.jpg",
	"https://images.squarespace-cdn.com/content/v1/5a4518c618b27d634a12e374/1525450645042-XIBMO7CPAX320UNP2ULT/ke17ZwdGBToddI8pDm48kFGVtuGS9Igc_JmFJFuCkf57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmJdLpeZW_ttQnjXwTxihzWGOSK126mPv9r-SyoyB9KdwWXnfJ1qM3rss4H2p_MN9s/Sunny+Days+Playlist+Cover.jpg",
	"https://i.pinimg.com/originals/1e/c9/f6/1ec9f61d87ea36e3cd2ef15f571a7eaf.jpg",
	"https://data.whicdn.com/images/339688701/original.jpg",
	"https://i.pinimg.com/originals/be/14/88/be148863c1b38268192e240be7dd3428.jpg",
];

const PlayListGrid = () => {
	return (
		<Flex
			align="center"
			flexBasis={{ lg: "40%", md: "50%" }}
			wrap="wrap"
			justify="center"
			zIndex="1"
		>
			{Array(6)
				.fill()
				.map((box, i) => (
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
							src={playlistBackgrounds[i]}
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

const Home = ({ loggedIn, playlists }) => {
	return (
		<Box
			flexGrow="1"
			flexShrink="1"
			d="flex"
			pt="4%"
			alignItems="center"
			justifyContent="space-evenly"
		>
			<SpotifyLogin />
			<PlayListGrid />
		</Box>
	);
};

export default Home;
