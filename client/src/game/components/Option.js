import React from "react";
import { Box, Flex, Button, Text, PseudoBox, Spinner } from "@chakra-ui/core";

const Option = ({ text, loading, getBackground, id, clicked, onClick }) => {
	return (
		<Flex justify="center" align="center" minW="60%" h="60%">
			<PseudoBox
				as={Button}
				variant="unstyled"
				cursor={clicked.clicked ? "default" : "pointer"}
				w="100%"
				h="100%"
				bg={getBackground(id)}
				onClick={() => onClick(id)}
				d="flex"
				justifyContent="center"
				alignItems="center"
				shadow="xl"
				border="none"
				transition="all 0.15s ease"
				_focus={{ shadow: "xl" }}
				_hover={{
					bg: getBackground(id),
					...(clicked.clicked
						? {}
						: {
								shadow: "2xl",
								transform: "translateY(-.1em)",
						  }),
				}}
			>
				<Box fontSize="3xl">
					{loading && clicked.option == id ? (
						<Spinner size="lg" />
					) : (
						<>
							<Text>{text.title}</Text>
							<Text fontSize="lg">{text.artist}</Text>
						</>
					)}
				</Box>
			</PseudoBox>
		</Flex>
	);
};

export default Option;
