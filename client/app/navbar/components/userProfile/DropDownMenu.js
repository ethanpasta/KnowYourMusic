import React from "react";
import { Box, Link } from "@chakra-ui/core";

const DropDownMenu = ({ userRoutes, isDown, ...props }) => (
	<Box
		overflow="hidden"
		maxH={isDown ? "250px" : "0px"}
		transition="max-height .2s ease-out"
		w="full"
		bg={{ base: "rgba(93, 230, 222, 0.5)", md: "rgba(0, 0, 0, 0.2)" }}
		backgroundImage={{
			base:
				"linear-gradient(315deg, rgba(181, 142, 204, 0.5) 0%, rgba(93, 230, 222, 0.5) 74%)",
			md: "none",
		}}
		{...props}
	>
		{Object.keys(userRoutes).map(route => (
			<Link
				key={route}
				d="block"
				href={userRoutes[route]}
				textDecoration="none"
				fontFamily="'Lato', sans-serif"
				letterSpacing="1px"
				fontSize="sm"
				textAlign="center"
				color="white"
				_hover={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
				py={3}
			>
				{route.toUpperCase()}
			</Link>
		))}
	</Box>
);

export default DropDownMenu;
