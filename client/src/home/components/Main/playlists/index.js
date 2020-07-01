import React from "react";
import { SimpleGrid, Text, Box, Heading } from "@chakra-ui/core";
import "./style.scss";
import PlaylistItem from "./PlaylistItem";

const PlaylistGrid = ({ loggedIn, loading, data, ...props }) => {
	return (
		<Box
			w={["90%", "80%", "80%", "35%"]}
			h={{ base: "auto", lg: "85%" }}
			d="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			{...props}
		>
			<Box>
				<Heading
					textAlign="center"
					fontSize="2em"
					fontWeight="900"
					color="purple.200"
					textTransform="uppercase"
					rounded="lg"
					m="0"
					py={{ base: 4, lg: loggedIn ? 8 : "0" }}
					mb={{ base: loggedIn ? 4 : "0", lg: "0" }}
					bg={{ base: "textBlack", lg: "transparent" }}
				>
					Play with public playlists
				</Heading>
				{!loggedIn && (
					<Text
						textAlign="center"
						color="textWhite"
						fontWeight="500"
						py={{ base: 6, lg: 4 }}
						pb={{ lg: 6 }}
					>
						*No login required :)
					</Text>
				)}
			</Box>

			<SimpleGrid
				columns={[2, null, 3]}
				spacing={{ base: ".5em", lg: "1.5em" }}
				height={loading ? "100%" : "auto"}
				w="full"
				mx={{ base: "auto", md: "0" }}
			>
				{Object.keys(loading ? Array(6).fill() : data).map(playlist => (
					<PlaylistItem
						loading={loading}
						key={playlist}
						title={playlist}
						image={!loading && data[playlist]}
					/>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default PlaylistGrid;
