import React, { forwardRef } from "react";
import { Box, Text } from "@chakra-ui/core";
import Emoji from "../../../shared/Emoji";

const IntroContent = (props, ref) => (
	<Box ref={ref} {...props}>
		<Text fontSize={{ lg: "6xl", base: "5xl" }} pb={{ base: 2 }} color="#2e4045">
			Hey, it&apos;s simple.
		</Text>
		<Text
			fontSize={{ lg: "2xl", md: "xl", base: "lg" }}
			pb={2}
			fontWeight="500"
			color="	#5e3c58"
		>
			<Emoji symbol="🎵" /> We provide random lyrics, you guess the song.{" "}
			<Emoji symbol="🎵" />
			<br />
			How well do you know your music?
		</Text>
		<Text
			style={{
				background: "-webkit-linear-gradient(315deg, #e4b5cb 0%, #722ae6 74%)",
				WebkitBackgroundClip: "text",
				WebkitTextFillColor: "transparent",
			}}
			fontSize={{ md: "3xl", base: "xl" }}
			pb={{ base: 4, md: 0 }}
			fontWeight="900"
			color="gray.800"
			mx="auto"
			px={2}
			py={0.5}
			mt={1}
		>
			<i>ARE YOU READY?</i>
		</Text>
	</Box>
);

export default forwardRef(IntroContent);
