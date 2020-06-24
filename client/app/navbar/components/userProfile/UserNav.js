import React from "react";
import { Box, Icon, Text, Avatar, PseudoBox } from "@chakra-ui/core";

const UserLargeButton = ({ user, isOpen, scrolled, ...props }) => (
	<PseudoBox
		role="group"
		borderTopLeftRadius="25px"
		borderBottomLeftRadius="25px"
		borderTopRightRadius="lg"
		borderBottomRightRadius="lg"
		minWidth="140px"
		h="40px"
		shadow={scrolled ? "none" : "xl"}
		transition="all 0.15s ease-out"
		cursor="pointer"
		d="flex"
		border="2px solid transparent"
		alignItems="center"
		justifyContent="flex-end"
		position="relative"
		_hover={{ border: isOpen ? "2px solid transparent" : "2px solid rgba(0, 0, 0, 0.1)" }}
		{...props}
	>
		<Avatar src={user.images[0].url} position="absolute" left="-10px" />
		<Box>
			{user.display_name.split(" ").map(
				(word, i) =>
					i != user.display_name.length - 1 && (
						<Text
							color="textBlack"
							textAlign="center"
							key={i}
							fontFamily="'Lato', sans-serif"
							fontWeight="700"
							fontStyle="italic"
							letterSpacing="1px"
							lineHeight="1"
						>
							{word}
						</Text>
					)
			)}
		</Box>
		<PseudoBox
			as={Icon}
			name={isOpen ? "triangle-up" : "triangle-down"}
			size="10px"
			color="white"
			ml={4}
			mr={3}
			transition="all 0.15s ease-out"
			_groupHover={{
				color: "#db85fa",
				transform: "scale(1.3)",
				transition: "all 0.15s ease-out",
			}}
		/>
	</PseudoBox>
);

const UserSmallButton = ({ user, isOpen, ...props }) => (
	<PseudoBox
		cursor="pointer"
		d="flex"
		alignItems="center"
		justifyContent="space-evenly"
		{...props}
	>
		<Avatar src={user.images[0].url} />
		<Text fontFamily="'Lato', sans-serif" letterSpacing="1px" color="textBlack">
			{user.display_name}
		</Text>
		<Icon name={isOpen ? "triangle-up" : "triangle-down"} size="15px" color="#db85fa" />
	</PseudoBox>
);

export default ({ size, ...props }) => {
	return {
		sm: UserSmallButton(props),
		lg: UserLargeButton(props),
	}[size];
};
