import React from "react";
import { Flex, PseudoBox, Image } from "@chakra-ui/core";

const PlayListGrid = ({ loading, data }) => {
	return (
		<Flex
			align="center"
			flexBasis={{ lg: "40%", md: "50%" }}
			wrap="wrap"
			justify="center"
			zIndex="1"
		>
			{Object.keys(data || []).map(i => (
				<PseudoBox
					key={i}
					cursor="pointer"
					flexBasis="40%"
					d="flex"
					justifyContent={{
						lg: i % 2 == 0 ? "flex-end" : "flex-start",
						sm: "center",
					}}
					mx={5}
					my={3}
				>
					{/* <Skeleton isLoaded={!loading}> */}
					<Image
						src={data[i]}
						objectFit="contain"
						w={{ lg: "70%", md: "90%" }}
						rounded="lg"
						shadow="lg"
					></Image>
					{/* </Skeleton> */}
				</PseudoBox>
			))}
		</Flex>
	);
};

export default PlayListGrid;
