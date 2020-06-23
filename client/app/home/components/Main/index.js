import React, { useState, useRef } from "react";
import { Box } from "@chakra-ui/core";
import SpotifyLogin from "./SpotifyLogin";
import PlayListGrid from "./playlists";
import VisibilitySensor from "react-visibility-sensor";

const MainContent = ({ playlists }) => {
	const [showPart2, setShowPart2] = useState(false);
	const domRef = useRef();

	const onVisibilityChange = isVisible => {
		if (domRef.current && domRef.current.getBoundingClientRect().top < 110) {
			return;
		}
		setShowPart2(isVisible);
	};
	return (
		<Box
			d="flex"
			h={{ base: "150vh", lg: "70vh" }}
			flexDirection={{ base: "column", lg: "row" }}
			justifyContent={{ base: "space-around", lg: "space-around" }}
			alignItems={{ base: "center", lg: "center" }}
			w="100%"
			opacity={showPart2 ? "1" : "0"}
			transition="opacity 0.5s ease"
			ref={domRef}
		>
			<VisibilitySensor onChange={onVisibilityChange} offset={{ top: 100 }}>
				<>
					<SpotifyLogin />
					<PlayListGrid {...playlists} />
				</>
			</VisibilitySensor>
		</Box>
	);
};

export default MainContent;
