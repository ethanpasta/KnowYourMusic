import React, { useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/core";
import UserLink from "./components/UserLink";
import MobileNavbar from "./components/MobileNavbar";
import NavbarLinks from "./components/NavbarLinks";
import HamburgerMenu from "./components/HamburgerMenu";
import { withRouter } from "react-router-dom";
import Logo from "../shared/Logo";

const NavbarComponent = ({ navRoutes, userRoutes, user, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [regStyle, setRegStyle] = useState(false);
	useEffect(() => {
		if (props.location.pathname.includes("game")) {
			setRegStyle(true);
		} else {
			setRegStyle(false);
		}
	}, [props.location.pathname]);
	return (
		<Box
			zIndex="1"
			position="sticky"
			top="0"
			d="flex"
			height={{ base: "7vh", xl: "8vh" }}
			alignItems="center"
			justifyContent="flex-end"
			style={{
				backdropFilter: "blur(15px)",
				transitionDelay: "400",
			}}
			transition="all 0.2s ease"
		>
			<Logo small={regStyle} />
			<HamburgerMenu open={onOpen} color="ghostWhite" />
			<MobileNavbar
				isOpen={isOpen}
				onClose={onClose}
				userRoutes={userRoutes}
				routes={navRoutes}
				user={user}
			/>
			<Box
				flexBasis={{ md: "70%", lg: "60%", xl: "42%" }}
				d={{ base: "none", md: "flex" }}
				justifyContent="space-evenly"
				alignItems="center"
			>
				<NavbarLinks routes={navRoutes} />
				<UserLink userRoutes={userRoutes} user={user} />
			</Box>
		</Box>
	);
};

export default withRouter(NavbarComponent);
