import React, { useState, useEffect } from "react";
import { Box, Icon, useDisclosure } from "@chakra-ui/core";
import Logo from "../shared/Logo";
import UserLink from "./components/UserLink";
import MobileNavbar from "./components/MobileNavbar";
import NavbarLinks from "./components/NavbarLinks";
import HamburgerMenu from "./components/HamburgerMenu";

const NavbarComponent = ({ scrolled, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navRoutes = {
		about: "/",
		leaderboard: "/",
	};
	const userRoutes = {
		logout: "/auth/logout",
		"my stats": "#",
	};
	return (
		<Box
			position={{ base: "sticky", md: "initial" }}
			top="0"
			d="flex"
			zIndex="999"
			height={{ base: "7vh", xl: "8vh" }}
			alignItems="center"
			justifyContent="flex-end"
			bg={{ base: scrolled ? "ghostWhite" : "none", md: "transparent" }}
			shadow={{ base: scrolled ? "xl" : "none", md: "none" }}
			transition="background-color 0.5s ease"
		>
			<Logo scrolled={scrolled} />
			<HamburgerMenu open={onOpen} color={scrolled ? "textBlack" : "ghostWhite"} />
			<MobileNavbar
				isOpen={isOpen}
				onClose={onClose}
				userRoutes={userRoutes}
				routes={navRoutes}
				{...props}
			/>
			<Box
				flexBasis={{ md: "60%", lg: "50%", xl: "40%" }}
				d={{ base: "none", md: "flex" }}
				justifyContent="space-evenly"
				alignItems="center"
			>
				<NavbarLinks routes={navRoutes} />
				<UserLink userRoutes={userRoutes} {...props} />
			</Box>
		</Box>
	);
};

export default NavbarComponent;
