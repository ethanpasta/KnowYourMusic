import React from "react";
import { Text, PseudoBox, Button, Image } from "@chakra-ui/core";
import SpotifyIcon from "../../assets/imgs/spotifyIconBlack.png";

const SpotifyButton = ({ size }) => {
	const sizes = {
		sm: {
			fontSize: "md",
			w: 60,
			h: 30,
		},
		md: {
			fontSize: "lg",
			w: 80,
			h: 45,
		},
		lg: {
			fontSize: "xl",
			w: 100,
			h: 60,
		},
	};
	return (
		<>
			<PseudoBox
				cursor="pointer"
				as="a"
				href="/auth"
				d="flex"
				alignItems="center"
				justifyContent="space-evenly"
				bg="#1DB954"
				h={`${sizes[size].h}px`}
				textDecoration="none"
				px={2}
				borderRadius={`${sizes[size].w * 0.5}px`}
			>
				<Text
					fontSize={sizes[size].fontSize}
					fontWeight="500"
					color="#191414"
					pr={2}
					letterSpacing={1}
					fontFamily="'Lato', sans-serif"
				>
					CONNECT WITH
				</Text>
				<Image src={SpotifyIcon} size={`${0.7 * sizes[size].h}px`} objectFit="cover" />
			</PseudoBox>
		</>
	);
};

export default SpotifyButton;
