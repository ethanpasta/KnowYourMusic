import React from "react";
import { Text, PseudoBox, Button, Image } from "@chakra-ui/core";
import SpotifyIcon from "../../assets/imgs/spotifyIcon.png";

const SpotifyButton = props => (
	<PseudoBox
		cursor="pointer"
		as="a"
		href="/auth"
		d="flex"
		alignItems="center"
		justifyContent="space-evenly"
		bg="#1DB954"
		minH="2.6rem"
		textDecoration="none"
		px={4}
		borderRadius="1.5rem"
		{...props}
	>
		<Text
			fontSize={{ base: "lg", md: "xl" }}
			fontWeight={{ md: "500" }}
			color="#ffffff"
			pr={2}
			letterSpacing={1}
			fontFamily="'Lato', sans-serif"
		>
			CONNECT WITH
		</Text>
		<Image src={SpotifyIcon} size="2rem" objectFit="cover" />
	</PseudoBox>
);

export default SpotifyButton;
