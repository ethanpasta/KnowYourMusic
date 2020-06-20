import React from "react";
import { SimpleGrid, PseudoBox, Image, Text, Box, Heading, Skeleton } from "@chakra-ui/core";
import Confetti from "react-confetti";
import "./style.scss";

const PlaylistItem = ({ title, image }) => {
	return (
		<PseudoBox
			role="group"
			cursor="pointer"
			pos="relative"
			_hover={{ transform: "scale(1.2)", transformOrigin: "center center", zIndex: "999" }}
			transition="all 0.3s ease"
		>
			<PseudoBox
				as={Image}
				src={image}
				d="block"
				rounded="lg"
				width="100%"
				border="2px solid rgba(255, 255, 255, 0.7)"
				objectFit="contain"
				_groupHover={{
					filter: "blur(3px) grayscale(100%) brightness(30%)",
				}}
				transition="all 0.3s ease"
				zIndex="1"
			></PseudoBox>
			<PseudoBox
				position="absolute"
				top="0px"
				right="-2px"
				w="calc(100% - 4px)"
				h="calc(100% - 6px)"
				justifyContent="center"
				alignItems="center"
				d="flex"
				flexDirection="column"
				rounded="lg"
				_groupHover={{ opacity: 1, border: "2px solid rgba(255, 255, 255, 0.7)" }}
				transition="all 0.2s ease"
				opacity="0"
			>
				<PseudoBox
					as={Text}
					mb="4em"
					className="start-text"
					_groupHover={{
						marginBottom: "0",
					}}
					transition="all 0.3s ease"
					color="#db85fa"
					fontSize={{ base: "1em", md: "1.5em", xl: "2em" }}
					fontWeight="800"
					fontFamily="Spartan, sans-serif"
				>
					PLAY
				</PseudoBox>
			</PseudoBox>
		</PseudoBox>
	);
};

const PlaylistGrid = ({ loading, data, ...props }) => {
	if (loading)
		return (
			<SimpleGrid columns={[2, null, 3]} spacing="1rem">
				<Skeleton w="100%" h="100%"></Skeleton>
			</SimpleGrid>
		);
	return (
		<Box alignSelf="flex-end" flexBasis="30%" {...props}>
			<Box mb={8}>
				<Heading
					textAlign="center"
					fontSize="2em"
					fontWeight="900"
					color={{ base: "#2e3b4c", md: "purple.200" }}
					textTransform="uppercase"
					mb={1}
				>
					Play with public playlists
				</Heading>
				<Text textAlign="center" color="textWhite" fontWeight="500">
					*No login required :)
				</Text>
			</Box>

			<SimpleGrid columns={[2, null, 3]} spacing=".7rem">
				{Object.keys(data || []).map(playlist => (
					<PlaylistItem key={playlist} title={playlist} image={data[playlist]} />
				))}
			</SimpleGrid>
		</Box>
	);
};

export default PlaylistGrid;
