import React from "react";
import { Text } from "@chakra-ui/core";
import "./style.scss";

const Logo = () => (
	<Text
		className="logoText"
		fontFamily="Spartan, sans-serif"
		fontSize={{ base: "35px", md: "50px", lg: "60px", xl: "70px" }}
		fontWeight="800"
		letterSpacing="-1px"
		lineHeight="0.95"
	>
		know
		<br />
		your
		<br />
		music.
	</Text>
);

export default Logo;
