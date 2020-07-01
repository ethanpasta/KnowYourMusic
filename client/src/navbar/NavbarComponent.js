import React, { useState, useEffect } from "react";
import { Box, useDisclosure } from "@chakra-ui/core";
import UserLink from "./components/UserLink";
import MobileNavbar from "./components/MobileNavbar";
import NavbarLinks from "./components/NavbarLinks";
import HamburgerMenu from "./components/HamburgerMenu";

const NavbarComponent = ({ navRoutes, userRoutes, user }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrolled, setScrolled] = useState(false);

	return (
		<Box
			zIndex="1"
			position="sticky"
			top="0"
			d="flex"
			height={{ base: "7vh", xl: "8vh" }}
			shadow={scrolled ? "lg" : "none"}
			alignItems="center"
			justifyContent="flex-end"
			bg={scrolled ? "rgba(255, 255, 255, 0.15)" : "none"}
			style={{
				backdropFilter: "blur(15px)",
				transitionDelay: "400",
			}}
			transition="all 0.2s ease"
		>
			<HamburgerMenu open={onOpen} color="ghostWhite" />
			<MobileNavbar
				isOpen={isOpen}
				onClose={onClose}
				userRoutes={userRoutes}
				routes={navRoutes}
				scrolled={scrolled}
				user={user}
			/>
			<Box
				flexBasis={{ md: "70%", lg: "60%", xl: "42%" }}
				d={{ base: "none", md: "flex" }}
				justifyContent="space-evenly"
				alignItems="center"
			>
				<NavbarLinks routes={navRoutes} scrolled={scrolled} />
				<UserLink userRoutes={userRoutes} user={user} scrolled={scrolled} />
			</Box>
		</Box>
	);
};

export default NavbarComponent;
