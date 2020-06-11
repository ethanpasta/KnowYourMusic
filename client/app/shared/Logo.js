import React from "react";
import { Text } from "@chakra-ui/core";
import "./style.css";

const Logo = () => (
	<Text
		className="logoText"
		fontFamily="Spartan, sans-serif"
		fontSize={{ sm: "40px", md: "60px", lg: "70px" }}
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
