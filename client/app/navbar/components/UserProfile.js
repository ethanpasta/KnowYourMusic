import React from "react";
import { Box, Icon, Text, Avatar, PseudoBox, Skeleton } from "@chakra-ui/core";
import SpotifyButton from "../../shared/SpotifyButton";

const UserProfile = ({ user }) => {
	return (
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
				name="triangle-down"
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
};

const SpotifyLogin = () => {
	return <SpotifyButton size="md" />;
};

const UserLink = ({ loading, loggedIn, user }) => {
	if (loading) {
		return <Skeleton w="150px" h="50px" rounded="lg"></Skeleton>;
	}
	return loggedIn ? <UserProfile user={user} /> : <SpotifyLogin />;
};

export default UserLink;
