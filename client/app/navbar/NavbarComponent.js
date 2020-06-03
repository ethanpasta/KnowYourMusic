import React, { useState } from "react";
import Logo from "../../assets/imgs/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Image, Icon, Text, Avatar, PseudoBox } from "@chakra-ui/core";

const HamburgerMenu = ({ toggle }) => (
	<Box display={{ sm: "block", md: "none" }} onClick={toggle}>
		<Icon name="hamburger" color="black" size="20px" />
	</Box>
);

const blueTextColor = "#568BB3";

const NavbarComponent = props => {
	const [show, setShow] = useState(false);
	const handleMenuToggle = () => setShow(!show);
	return (
		<Flex align="center" justify="space-between" pt={5}>
			<Box className="leftSide">
				<Link to="/">
					<Image src={Logo} alt="logo" height="30px" objectFit="contain" ml={5} />
				</Link>
			</Box>
			<Box className="rightSide" flexBasis={{ sm: "10%", md: "40%" }}>
				<Box
					display={{ sm: "block", md: "none" }}
					alignSelf="flex-end"
					onClick={handleMenuToggle}
				>
					<HamburgerMenu toggle={handleMenuToggle} />
				</Box>
				<Box d={{ sm: "none", md: "flex" }} justifyContent="space-evenly" align="center">
					<Box>
						<Link
							as={RouterLink}
							to="/"
							color={blueTextColor}
							_hover={{ textDecoration: "none", fontWeight: "bold" }}
						>
							<Text fontSize="xl" letterSpacing={4}>
								LEADER-BOARD
							</Text>
						</Link>
					</Box>
					<PseudoBox
						as={RouterLink}
						to="/"
						textDecoration="none"
						border="1px"
						borderColor="gray.300"
						rounded="lg"
						_hover={{ borderColor: "#1B346C" }}
						h="80%"
					>
						<Flex
							color="#1B346C"
							align="center"
							justify="space-between"
							h="100%"
							px={1}
						>
							<Avatar src="https://bit.ly/sage-adebayo" />
							<Box ml="3">
								<Text color="gray.800">ETHAN MAYER</Text>
							</Box>
						</Flex>
					</PseudoBox>
				</Box>
			</Box>
		</Flex>
	);
};

export default NavbarComponent;
