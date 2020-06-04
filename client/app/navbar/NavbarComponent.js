import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Icon, Text, Avatar, PseudoBox } from "@chakra-ui/core";
import "./style.css";

const WaveSVG = () => (
	<Box position="absolute" top="-10%" zIndex="-1" w="100%">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
			<path
				fill="#a2d9ff"
				fillOpacity="0.8"
				d="M0,192L18.5,165.3C36.9,139,74,85,111,69.3C147.7,53,185,75,222,106.7C258.5,139,295,181,332,181.3C369.2,181,406,139,443,117.3C480,96,517,96,554,122.7C590.8,149,628,203,665,229.3C701.5,256,738,256,775,229.3C812.3,203,849,149,886,160C923.1,171,960,245,997,277.3C1033.8,309,1071,299,1108,261.3C1144.6,224,1182,160,1218,160C1255.4,160,1292,224,1329,229.3C1366.2,235,1403,181,1422,154.7L1440,128L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"
			></path>
		</svg>
		<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="#08BDBA"
				d="M59.6,-41.6C75.2,-28,84.3,-3.4,80.1,19.7C76,42.9,58.7,64.4,39.1,69.3C19.5,74.1,-2.4,62.3,-23,51.1C-43.7,39.9,-63,29.3,-69,12.9C-75,-3.5,-67.6,-25.8,-53.9,-38.9C-40.2,-52.1,-20.1,-56.1,1,-56.9C22,-57.6,44.1,-55.2,59.6,-41.6Z"
				transform="translate(100 100)"
			/>
		</svg>
	</Box>
);

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
			<Box className="rightSide" flexBasis={{ sm: "10%", md: "40%" }} zIndex="1">
				{/* 				<WaveSVG />
				 */}{" "}
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
