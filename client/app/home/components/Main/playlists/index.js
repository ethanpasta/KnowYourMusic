import React from "react";
import { SimpleGrid, Text, Box, Heading } from "@chakra-ui/core";
import "./style.scss";
import PlaylistItem from "./PlaylistItem";

const PlaylistGrid = ({ loading, data, ...props }) => {
	return (
		<Box
			w={["90%", "70%", null, "30%"]}
			h={{ base: "45%", lg: "80%" }}
			d="flex"
			flexDirection="column"
			justifyContent="flex-start"
			{...props}
		>
			<Box mb={8}>
				<Heading
					textAlign="center"
					fontSize="2em"
					fontWeight="900"
					color="purple.200"
					textTransform="uppercase"
					mb={1}
				>
					Play with public playlists
				</Heading>
				<Text textAlign="center" color="textWhite" fontWeight="500">
					*No login required :)
				</Text>
			</Box>

			<SimpleGrid
				columns={[2, null, 3]}
				spacing="1.5em"
				height={loading ? "70%" : "auto"}
				w="100%"
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
