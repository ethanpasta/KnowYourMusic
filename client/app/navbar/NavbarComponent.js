import React, { useState } from "react";
import {
	Box,
	Icon,
	Button,
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent,
	useDisclosure,
} from "@chakra-ui/core";
import Logo from "../shared/Logo";
import UserLink from "./components/UserLink";
import RegNavLink from "./components/RegNavLink";

const HamburgerMenu = ({ open }) => (
	<Box display={{ base: "block", md: "none" }} onClick={open} mr={5} cursor="pointer">
		<Icon name="hamburger" color="white" size="25px" />
	</Box>
);

const NavLinks = props => {
	return (
		<>
			<RegNavLink text="ABOUT" href="/" {...props} />
			<RegNavLink text="LEADERBOARD" href="/" {...props} />
		</>
	);
};

const MobileNav = ({ isOpen, onClose, ...props }) => {
	const closeButton = React.useRef();
	return (
		<>
			<Drawer isOpen={isOpen} onClose={onClose} initialFocusRef={closeButton}>
				<DrawerOverlay style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} />
				<DrawerContent maxWidth="16rem" paddingLeft="0" paddingRight="0">
					<Button
						ref={closeButton}
						bg="transparent"
						border="none"
						cursor="pointer"
						onClick={onClose}
						alignSelf="flex-end"
						position="absolute"
						top="1rem"
					>
						<Icon name="small-close" color="black" size="40px" />
					</Button>
					<DrawerBody
						px="0"
						pt={100}
						d="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="flex-start"
					>
						<UserLink {...props} mobile={true} mb={5} />
						<NavLinks mobile={true} py={5} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const NavbarComponent = props => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userRoutes = {
		logout: "/auth/logout",
		"my stats": "#",
	};
	return (
		<>
			<Box
				d="flex"
				flexGrow="0"
				flexShrink="1"
				pt={5}
				pb={2}
				alignItems="center"
				justifyContent="flex-end"
			>
				<Logo />
				<HamburgerMenu open={onOpen} />
				<MobileNav isOpen={isOpen} onClose={onClose} userRoutes={userRoutes} {...props} />
				<Box
					flexBasis={{ md: "60%", lg: "50%", xl: "40%" }}
					d={{ base: "none", md: "flex" }}
					justifyContent="space-evenly"
					alignItems="center"
				>
					<NavLinks />
					<UserLink userRoutes={userRoutes} {...props} />
				</Box>
			</Box>
		</>
	);
};

export default NavbarComponent;
