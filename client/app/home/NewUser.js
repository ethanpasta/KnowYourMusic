import React, { useState, useEffect } from "react";
import { Flex, Box, Button, PseudoBox, Image, Heading, Text } from "@chakra-ui/core";

const NewUser = () => {
	return (
		<Box
			flexGrow="1"
			flexShrink="1"
			d="flex"
			pt="4%"
			alignItems="center"
			justifyContent="space-evenly"
		>
			<SpotifyLogin />
			<PlayListGrid />
		</Box>
	);
};

export default NewUser;
