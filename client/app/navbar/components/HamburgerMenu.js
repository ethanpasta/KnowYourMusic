import React from "react";
import { Box, Icon } from "@chakra-ui/core";

const HamburgerMenu = ({ open, color }) => (
	<Box display={{ base: "block", md: "none" }} onClick={open} mr={5} mt={1} cursor="pointer">
		<Icon name="hamburger" color={color} size="25px" />
	</Box>
);

export default HamburgerMenu;
