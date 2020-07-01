import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/core";
import Emoji from "../../../shared/Emoji";
import ScrollDownIcon from "../../../shared/ScrollDownIcon";
import useScrollPosition from "../../../shared/useScrollPosition";
import Typist from "react-typist";
import "./style.css";

const ScrollDown = () => {
	const [showScrollIcon, setShowScrollIcon] = useState(true);
	useScrollPosition(({ currPos }) => setShowScrollIcon(currPos.y < 10), true);

	return (
		<Box
			fontFamily="'Lato', sans-serif"
			letterSpacing="wide"
			fontSize={{ md: "xl", base: "xl" }}
			pos="absolute"
			bottom="5px"
			width="100%"
			fontWeight="900"
			color="gray.700"
			mx="auto"
			opacity={showScrollIcon ? "1" : "0"}
			transition="opacity 0.2s ease"
		>
			<i>ARE YOU READY?</i>
			<ScrollDownIcon />
		</Box>
	);
};

const IntroContent = ({ name }) => (
	<Box textAlign="center">
		<Box
			fontSize={{ lg: "6xl", base: "5xl" }}
			pb={{ base: 2 }}
			color="textBlack"
			fontWeight="700"
			fontFamily="system-ui, sans-serif"
			w="full"
		>
			Hey{name && " "}
			{name && (
				<Typist
					avgTypingDelay={100}
					className="typing"
					cursor={{ hideWhenDone: true, hideWhenDoneDelay: 300 }}
				>
					{name}
				</Typist>
			)}
			, it&apos;s simple.
		</Box>
		<Text
			fontSize={{ lg: "2xl", md: "xl", base: "lg" }}
			pb={2}
			fontWeight="500"
			color="textBlack"
		>
			<Emoji symbol="🎵" /> We provide random lyrics, you guess the song <Emoji symbol="🎵" />
			<br />
			How well do you know your music?
		</Text>
		<ScrollDown />
	</Box>
);

export default IntroContent;
