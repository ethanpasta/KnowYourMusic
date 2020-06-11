import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Icon, Text, Avatar, PseudoBox, Skeleton } from "@chakra-ui/core";
import Logo from "../shared/Logo";
import UserLink from "./components/UserProfile";
import RegNavLink from "./components/RegNavLink";

const HamburgerMenu = ({ toggle }) => (
	<Box display={{ sm: "block", md: "none" }} onClick={() => toggle()} mr={3} cursor="pointer">
		<Icon name="hamburger" color="white" size="30px" />
	</Box>
);

const NavbarComponent = ({ loading, loggedIn, user }) => {
	const [show, setShow] = useState(false);
	const handleMenuToggle = () => setShow(!show);

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
				<Box flexBasis={{ md: "60%", lg: "50%", xl: "40%" }}>
					<HamburgerMenu toggle={handleMenuToggle} />
					<Box
						d={{ sm: "none", md: "flex" }}
						justifyContent="space-evenly"
						alignItems="center"
					>
						<RegNavLink text="ABOUT" href="/" />
						<RegNavLink text="LEADERBOARD" href="/" />
						<UserLink loggedIn={loggedIn} loading={loading} user={user} />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default NavbarComponent;
