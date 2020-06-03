import React, { useState, useEffect } from "react";
import { Flex, Box, Button, PseudoBox, Image, Heading } from "@chakra-ui/core";

const button_style = {
	height: "60px",
	width: "120px",
	background: 'url("https://www.scdn.co/i/_global/open-graph-default.png")',
	backgroundSize: "contain",
	borderRadius: "40px",
	margin: "0 auto",
};

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
		<Flex align="center" flexBasis={{ lg: "40%", md: "50%" }} wrap="wrap" justify="center">
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
							rounded="md"
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
				shadow="md"
				w="md"
				background="inherit"
				position="relative"
				d="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
				p={5}
				z-index="1"
				_before={{
					content: '""',
					position: "absolute",
					top: "0",
					left: "0",
					right: "0",
					bottom: "0",
					boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5)",
					filter: "blur(10px)",
					background: "inherit",
				}}
			>
				<Heading size="md">Login with Spotify</Heading>
				<PseudoBox rounded="lg" border="none" cursor="pointer">
					<Button
						w="100px"
						h="60px"
						as="a"
						bgImage="url('https://www.scdn.co/i/_global/open-graph-default.png')"
						bgSize="cover"
						bgPos="center"
					></Button>
				</PseudoBox>
			</PseudoBox>
		</Flex>
	);
};

const NewUser = () => {
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

export default NewUser;
