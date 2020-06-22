import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/core";
import IntroContent from "./IntroContent";

const Intro = ({ user, handleScrollEvent, ...props }) => {
	let domRef = useRef(null);
	const scrolled = useRef(false);

	useEffect(() => {
		const topPosition = domRef.current.getBoundingClientRect().top;
		const onScroll = () => {
			const scrollPosition = window.scrollY + 200;
			if (!scrolled.current && scrollPosition > topPosition) {
				scrolled.current = true;
				handleScrollEvent(true);
			} else if (scrolled.current && scrollPosition < topPosition) {
				scrolled.current = false;
				handleScrollEvent(false);
			}
		};

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return (
		<Box
			color="#f4f6ff"
			textAlign="center"
			fontFamily="'Lato', sans-serif"
			fontWeight="700"
			letterSpacing="0.5px"
			w={{ base: "80%", md: "70%", lg: "55%", xl: "38%" }}
			{...props}
		>
			<IntroContent name={user} ref={domRef} />
		</Box>
	);
};

export default Intro;
