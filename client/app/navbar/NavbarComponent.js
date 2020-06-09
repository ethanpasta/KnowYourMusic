import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Icon, Text, Avatar, PseudoBox, Skeleton } from "@chakra-ui/core";
import "./style.css";

const Logo = () => (
	<Link to="/">
		<Text className="logoText" fontFamily="Spartan, sans-serif">
			know
			<br />
			your
			<br />
			music.
		</Text>
	</Link>
);

const HamburgerMenu = ({ toggle }) => (
	<Box display={{ sm: "block", md: "none" }} onClick={toggle}>
		<Icon name="hamburger" color="black" size="20px" />
	</Box>
);

const NavRegLink = ({ text, href }) => (
	<Link
		className="hvr-grow-shadow"
		as={RouterLink}
		to={href}
		_hover={{ textDecoration: "none", border: "2px solid #db85fa" }}
		fontWeight="500"
		textAlign="center"
		rounded="md"
		p={1}
		px={2}
		border="2px solid transparent"
		transform="skew(-10deg)"
		bg="rgba(255, 255, 255, 0.3)"
		shadow="lgwhite"
	>
		<Text fontSize="lg" letterSpacing={3} color="#f4f6ff" fontFamily="'Lato', sans-serif">
			{text}
		</Text>
	</Link>
);

const ProfileLink = ({ loading, loggedIn, user }) => {
	if (loading) {
		return <Skeleton w="150px" h="50px" rounded="lg"></Skeleton>;
	}
	return loggedIn ? (
		<PseudoBox
			bg="rgba(255, 255, 255, 0.3)"
			role="group"
			borderTopLeftRadius="25px"
			borderBottomLeftRadius="25px"
			borderTopRightRadius="lg"
			borderBottomRightRadius="lg"
			minWidth="140px"
			h="43px"
			shadow="md"
			transition="all 0.2s ease-in-out"
			cursor="pointer"
			d="flex"
			border="2px solid rgba(0, 0, 0, 0)"
			alignItems="center"
			justifyContent="flex-end"
			position="relative"
			_hover={{ border: "2px solid #db85fa" }}
		>
			<Avatar
				src={user.images[0].url}
				border="2px solid #db85fa"
				position="absolute"
				left="-10px"
			/>
			<Box>
				{user.display_name.split(" ").map(
					(word, i) =>
						i != user.display_name.length - 1 && (
							<Text
								color="#f4f6ff"
								fontSize="1em"
								textAlign="center"
								key={i}
								fontFamily="'Lato', sans-serif"
								fontWeight="700"
								fontStyle="italic"
								letterSpacing="0.5px"
								lineHeight="1"
							>
								{word}
							</Text>
						)
				)}
			</Box>
			<PseudoBox
				as={Icon}
				name="triangle-down"
				size="10px"
				color="white"
				ml={4}
				mr={3}
				transition="all 0.2s ease-in-out"
				_groupHover={{
					color: "#db85fa",
					transform: "scale(1.3)",
					transition: "all 0.2s ease-in-out",
				}}
			/>
		</PseudoBox>
	) : (
		<h2>New User</h2>
	);
};

const NavbarComponent = ({ loading, loggedIn, user }) => {
	const [show, setShow] = useState(false);
	const handleMenuToggle = () => setShow(!show);
	return (
		<>
			<Box className="nav-flex">
				<Logo />
				<Box className="rightSide" flexBasis={{ sm: "10%", md: "40%" }} zIndex="1">
					<Box
						display={{ sm: "block", md: "none" }}
						alignSelf="flex-end"
						onClick={handleMenuToggle}
					>
						<HamburgerMenu toggle={handleMenuToggle} />
					</Box>
					<Box
						d={{ sm: "none", md: "flex" }}
						justifyContent="space-evenly"
						alignItems="center"
					>
						<NavRegLink text="ABOUT" href="/" />
						<NavRegLink text="LEADERBOARD" href="/" />
						<ProfileLink loading={loading} loggedIn={loggedIn} user={user} />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default NavbarComponent;
