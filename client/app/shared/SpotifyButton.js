import React from "react";
import { Text, PseudoBox, Button, Image } from "@chakra-ui/core";
import SpotifyIcon from "../../assets/imgs/spotifyIcon.png";
import SpotifyIconBlack from "../../assets/imgs/spotifyIconBlack.png";

const SpotifyButton = ({ giant, ...props }) => (
	<PseudoBox
		cursor="pointer"
		as="a"
		href="/auth"
		d="flex"
		alignItems="center"
		justifyContent="space-evenly"
		bg="#1DB954"
		minH={giant ? "4rem" : "2.3rem"}
		textDecoration="none"
		px={4}
		borderRadius={giant ? "2rem" : "1.5rem"}
		w="fit-content"
		shadow={giant ? "mdWhite" : "none"}
		transition="transform 0.2s ease"
		_hover={{ transform: "scaleX(0.95)" }}
		{...props}
	>
		<Text
			fontSize={{ base: giant ? "2xl" : "lg", md: giant ? "2xl" : "xl" }}
			fontWeight={{ md: "500" }}
			color={giant ? "black" : "#ffffff"}
			pr={2}
			letterSpacing={1}
			fontFamily="'Lato', sans-serif"
		>
			CONNECT {giant || "WITH"}
		</Text>
		<Image
			src={giant ? SpotifyIconBlack : SpotifyIcon}
			size={giant ? "3rem" : "1.5rem"}
			objectFit="cover"
		/>
	</PseudoBox>
);

export default SpotifyButton;
