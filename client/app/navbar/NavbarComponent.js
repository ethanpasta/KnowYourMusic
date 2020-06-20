import React, { useState, useEffect } from "react";
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
	const [scrolled, setScrolled] = useState(false);
	const getScrollPercent = () => {
		var h = document.documentElement,
			b = document.body,
			st = "scrollTop",
			sh = "scrollHeight";
		return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
	};
	const handleScroll = () => {
		setScrolled(getScrollPercent() > 18);
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);
	const userRoutes = {
		logout: "/auth/logout",
		"my stats": "#",
	};
	return (
		<Box
			position="sticky"
			top="0"
			d="flex"
			zIndex="999"
			height={{ base: "7vh", xl: "8vh" }}
			alignItems="center"
			justifyContent="flex-end"
			transition="background-color 0.5s ease"
		>
			<Logo scrolled={scrolled} />
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
	);
};

export default NavbarComponent;
