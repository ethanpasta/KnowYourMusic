import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Icon, Text, Avatar, PseudoBox } from "@chakra-ui/core";
import "./style.css";

const HamburgerMenu = ({ toggle }) => (
	<Box display={{ sm: "block", md: "none" }} onClick={toggle}>
		<Icon name="hamburger" color="black" size="20px" />
	</Box>
);

const NavRegLink = ({ text, href }) => (
	<Link
		as={RouterLink}
		to={href}
		color={blueTextColor}
		_hover={{ textDecoration: "none", fontWeight: "bold" }}
	>
		<Text fontSize="lg" letterSpacing={3}>
			{text}
		</Text>
	</Link>
);

const blueTextColor = "#568BB3";

const NavbarComponent = props => {
	const [show, setShow] = useState(false);
	const handleMenuToggle = () => setShow(!show);
	return (
		<Box className="nav-flex">
			<Link to="/">
				<Text className="logoText" fontFamily="Spartan, sans-serif">
					know
					<br />
					your
					<br />
					music.
				</Text>
			</Link>
			<Box className="rightSide" flexBasis={{ sm: "10%", md: "40%" }}>
				<Box
					display={{ sm: "block", md: "none" }}
					alignSelf="flex-end"
					onClick={handleMenuToggle}
				>
					<HamburgerMenu toggle={handleMenuToggle} />
				</Box>
				<Box
					d={{ sm: "none", md: "flex" }}
					justifyContent="space-around"
					alignItems="center"
				>
					<NavRegLink text="ABOUT" href="/" />
					<NavRegLink text="LEADERBOARD" href="/" />
					<PseudoBox
						as={RouterLink}
						to="/"
						textDecoration="none"
						border="1px"
						borderColor="gray.300"
						rounded="lg"
						_hover={{ borderColor: "#1B346C" }}
					>
						<Flex
							color="#1B346C"
							align="center"
							justify="space-between"
							h="100%"
							px={1}
						>
							<Avatar />
							<Box ml="3">
								<Text color="gray.800">ETHAN MAYER</Text>
							</Box>
						</Flex>
					</PseudoBox>
				</Box>
			</Box>
		</Box>
	);
};

export default NavbarComponent;
