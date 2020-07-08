import React, { useState, useRef } from "react";
import { Box, Image } from "@chakra-ui/core";
import PersonalLibrary from "./personalLibrary";
import PlayListGrid from "./playlists";
import VisibilitySensor from "react-visibility-sensor";
import Arrow from "../../../assets/imgs/arrow.png";

const MainContent = ({ playlists, user }) => {
	const [show, setShow] = useState(false);
	const domRef = useRef();

	const onVisibilityChange = isVisible => {
		if (domRef.current && domRef.current.getBoundingClientRect().top < 110) {
			return;
		}
		setShow(isVisible);
	};
	return (
		<Box
			d="flex"
			h={{ base: "180vh", lg: "75vh" }}
			my={{ base: "5vh", lg: "0" }}
			flexDirection={{ base: "column", lg: "row" }}
			justifyContent={{ base: "space-evenly", lg: "space-around" }}
			alignItems={{ base: "center", lg: "center" }}
			w="100%"
			opacity={show ? "1" : "0"}
			transition="opacity 0.5s ease"
			ref={domRef}
		>
			<VisibilitySensor onChange={onVisibilityChange} offset={{ top: 100 }}>
				<>
					<PersonalLibrary loading={user.loading} loggedIn={user.loggedIn} />
					<Image src={Arrow} w="40%" d={{ base: "block", lg: "none" }} py="1em" />
					<PlayListGrid loggedIn={user.loggedIn} {...playlists} />
				</>
			</VisibilitySensor>
		</Box>
	);
};

export default MainContent;
