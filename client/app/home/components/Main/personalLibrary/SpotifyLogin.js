import React from "react";
import { Text } from "@chakra-ui/core";
import SpotifyButton from "../../../../shared/SpotifyButton";

const SpotifyLogin = () => (
	<>
		<Text
			fontSize={{ base: "lg", md: "xl" }}
			color={{ base: "textBlack", lg: "textWhite" }}
			py={6}
			m={{ base: "0 auto" }}
			w="90%"
		>
			If you log in with your Spotify account, the game will be personalized and you can play
			with your own songs! Also, all of your previous game history will be stored.
		</Text>
		<SpotifyButton giant={true} m="0 auto" mb={6} />
	</>
);

export default SpotifyLogin;
