import React from "react";
import { PseudoBox, Image, Skeleton } from "@chakra-ui/core";

const PlaylistItem = ({ loading, title, image }) => {
	return loading ? (
		<Skeleton w="full" h="full" rounded="lg"></Skeleton>
	) : (
		<PseudoBox
			role="group"
			cursor="pointer"
			pos="relative"
			_hover={{
				transform: "scale(1.15)",
				transformOrigin: "center center",
				zIndex: "999",
			}}
			transition="all 0.3s ease"
			className="playlist"
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
					className="start-text"
					fontSize={["8rem", "8rem", "4rem", "8rem"]}
					letterSpacing="wider"
					textAlign="center"
					lineHeight="1"
					opacity="0"
					transition="all 0.15s ease"
					_groupHover={{
						opacity: 1,
					}}
				>
					<svg className="startgame-text" viewBox="0 0 600 300">
						<symbol id="s-text">
							<text textAnchor="middle" x="50%" y="50%" dy="0">
								<tspan x="50%">START</tspan>
								<tspan x="50%" dy="1em">
									GAME
								</tspan>
							</text>
						</symbol>
						<use className="text" xlinkHref="#s-text"></use>
						<use className="text" xlinkHref="#s-text"></use>
						<use className="text" xlinkHref="#s-text"></use>
						<use className="text" xlinkHref="#s-text"></use>
						<use className="text" xlinkHref="#s-text"></use>
					</svg>
				</PseudoBox>
			</PseudoBox>
		</PseudoBox>
	);
};

export default PlaylistItem;
