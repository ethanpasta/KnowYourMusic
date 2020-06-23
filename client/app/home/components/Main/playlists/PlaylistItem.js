import React from "react";
import { PseudoBox, Image, Text, Skeleton } from "@chakra-ui/core";

const PlaylistItem = ({ loading, title, image }) => {
	return loading ? (
		<Skeleton w="full" h="full" rounded="lg"></Skeleton>
	) : (
		<PseudoBox
			role="group"
			cursor="pointer"
			pos="relative"
			_hover={{
				transform: "scale(1.2)",
				transformOrigin: "center center",
				zIndex: "999",
			}}
			transition="all 0.3s ease"
		>
			<PseudoBox
				as={Image}
				src={image}
				d="block"
				rounded="lg"
				width="100%"
				border="2px solid transparent"
				objectFit="contain"
				_groupHover={{
					filter: "blur(3px) grayscale(100%) brightness(30%)",
				}}
				transition="all 0.3s ease"
				zIndex="1"
			/>
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
				_groupHover={{ opacity: 1, border: "2px solid #4cc9f0" }}
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

export default PlaylistItem;
