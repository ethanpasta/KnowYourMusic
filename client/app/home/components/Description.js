import React, { useState, useEffect } from "react";
import { Box, Flex, PseudoBox, Text, Button, Skeleton, Heading, Icon } from "@chakra-ui/core";
import Emoji from "../../shared/Emoji";
import ArrowSVG from "../../../assets/imgs/arrow.svg";

const NewUser = () => (
	<Box color="gray.200">
		<Text fontSize={{ md: "6xl", base: "3xl" }} pb={{ base: 2 }}>
			Hey, it&apos;s simple.
		</Text>
		<Text fontSize={{ md: "2xl", base: "lg" }} pb={2} fontWeight="500">
			Let&apos;s see how well you know your music.
			<br />
			We provide random lyrics <Emoji symbol="🎵" />, you guess the song.{" "}
			<Emoji symbol="🎵" />
		</Text>
		<PseudoBox
			bgImage="linear-gradient(315deg, #5de6de 0%, #b58ecc 74%)"
			transform="skew(-15deg)"
			w="fit-content"
			mx="auto"
			px={2}
			py={0.5}
			mt={1}
		>
			<Text
				transform="skew(15deg)"
				fontSize={{ md: "3xl", base: "xl" }}
				pb={{ base: 4, md: 0 }}
				fontWeight="900"
				color="gray.800"
			>
				ARE YOU READY?
			</Text>
		</PseudoBox>
	</Box>
);

const ExistingUser = ({ name }) => (
	<>
		<Text fontSize={{ md: "6xl", base: "3xl" }} pb={{ base: 2 }}>
			{`Hey ${name}!`}
		</Text>
		<Text fontSize={{ md: "2xl", base: "lg" }}>
			Welcome back. <br />
			Are you ready to play?
		</Text>
	</>
);

const Description = ({ user, ...props }) => {
	return (
		<Box
			color="#f4f6ff"
			textAlign="center"
			fontFamily="'Lato', sans-serif"
			fontWeight="700"
			letterSpacing="0.5px"
			w={{ base: "full", md: "70%", lg: "55%", xl: "38%" }}
			{...props}
		>
			{user ? <ExistingUser name={user} /> : <NewUser />}
		</Box>
	);
};

export default Description;
