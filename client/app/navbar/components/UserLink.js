import React, { useState } from "react";
import {
	Box,
	Icon,
	Text,
	Avatar,
	PseudoBox,
	Skeleton,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuGroup,
	MenuDivider,
	MenuOptionGroup,
	MenuItemOption,
} from "@chakra-ui/core";
import SpotifyButton from "../../shared/SpotifyButton";

const UserProfButton = ({ user, isOpen, ...props }) => (
	<PseudoBox
		bg="rgba(255, 255, 255, 0.3)"
		role="group"
		borderTopLeftRadius="25px"
		borderBottomLeftRadius="25px"
		borderTopRightRadius="lg"
		borderBottomRightRadius="lg"
		minWidth="140px"
		h="40px"
		shadow="mdwhite"
		transition="all 0.15s ease-out"
		cursor="pointer"
		d="flex"
		border="2px solid rgba(0, 0, 0, 0)"
		alignItems="center"
		justifyContent="flex-end"
		position="relative"
		_hover={{ border: "2px solid #db85fa" }}
		{...props}
	>
		<Avatar src={user.images[0].url} position="absolute" left="-10px" />
		<Box>
			{user.display_name.split(" ").map(
				(word, i) =>
					i != user.display_name.length - 1 && (
						<Text
							color="textWhite"
							textAlign="center"
							key={i}
							fontFamily="'Lato', sans-serif"
							fontWeight="700"
							fontStyle="italic"
							letterSpacing="1px"
							lineHeight="1"
						>
							{word}
						</Text>
					)
			)}
		</Box>
		<PseudoBox
			as={Icon}
			name={isOpen ? "triangle-up" : "triangle-down"}
			size="10px"
			color="white"
			ml={4}
			mr={3}
			transition="all 0.15s ease-out"
			_groupHover={{
				color: "#db85fa",
				transform: "scale(1.3)",
				transition: "all 0.15s ease-out",
			}}
		/>
	</PseudoBox>
);

const UserProfile = props => {
	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton border="none" bg="transparent" _focus={{ outline: 0 }}>
						<UserProfButton isOpen={isOpen} {...props} />
					</MenuButton>
					<MenuList>
						<MenuItem
							as={Link}
							href="/auth/logout"
							textDecoration="none"
							fontFamily="'Lato', sans-serif"
							letterSpacing="1px"
							textAlign="center"
						>
							LOGOUT
						</MenuItem>
						<MenuItem
							as={Link}
							href="#"
							textDecoration="none"
							fontFamily="'Lato', sans-serif"
							letterSpacing="1px"
							textAlign="center"
						>
							MY STATS
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
};

const UserProfileMobile = ({ user, ...props }) => {
	const [userDrop, setUserDrop] = useState(false);
	const handleClick = () => setUserDrop(!userDrop);
	return (
		<>
			<PseudoBox
				cursor="pointer"
				d="flex"
				alignItems="center"
				justifyContent="space-evenly"
				w="100%"
				onClick={handleClick}
				{...props}
			>
				<Avatar src={user.images[0].url} />
				<Text fontFamily="'Lato', sans-serif" letterSpacing="1px" color="black">
					{user.display_name}
				</Text>
				<Icon
					name={userDrop ? "triangle-up" : "triangle-down"}
					size="15px"
					color="#db85fa"
				/>
			</PseudoBox>

			<Box
				w="full"
				overflow="hidden"
				maxH={userDrop ? "250px" : "0px"}
				transition="max-height .3s ease-out"
				backgroundColor="#b3cdd1"
				backgroundImage="linear-gradient(315deg, #B58ECC 0%, #5DE6DE 74%)"
			>
				<Link
					d="block"
					href="/auth/logout"
					textDecoration="none"
					fontFamily="'Lato', sans-serif"
					letterSpacing="1px"
					textAlign="center"
					color="white"
					py={5}
				>
					LOGOUT
				</Link>
				<Link
					d="block"
					href="#"
					textDecoration="none"
					fontFamily="'Lato', sans-serif"
					letterSpacing="1px"
					textAlign="center"
					color="white"
					py={5}
				>
					MY STATS
				</Link>
			</Box>
		</>
	);
};

const SpotifyLogin = ({ size, ...props }) => {
	return <SpotifyButton size={size} {...props} />;
};

const UserLink = ({ loading, loggedIn, user, mobile, ...props }) => {
	if (loading) {
		return <Skeleton w={40} h={10} rounded="lg" textAlign="center"></Skeleton>;
	}
	return loggedIn ? (
		mobile ? (
			<UserProfileMobile user={user} {...props} />
		) : (
			<UserProfile user={user} {...props} />
		)
	) : (
		<SpotifyLogin {...props} />
	);
};

export default UserLink;
