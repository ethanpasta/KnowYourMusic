import React, { useState, useRef, useEffect } from "react";
import { Box, Skeleton } from "@chakra-ui/core";
import SpotifyButton from "../../shared/SpotifyButton";
import DropDownMenu from "../components/userProfile/DropDownMenu";
import UserNav from "./userProfile/UserNav";

const UserProfile = ({ mobile, userRoutes, profile }) => {
	const [userDrop, setUserDrop] = useState(false);
	const handleClick = () => setUserDrop(!userDrop);
	const dropDownRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = event =>
			dropDownRef.current &&
			!dropDownRef.current.contains(event.target) &&
			setUserDrop(false);
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropDownRef]);
	return (
		<Box
			{...(mobile ? { w: "100%" } : { position: "relative", role: "group" })}
			ref={dropDownRef}
		>
			<UserNav
				size={mobile ? "sm" : "lg"}
				onClick={handleClick}
				isOpen={userDrop}
				profile={profile}
			/>
			<DropDownMenu
				userRoutes={userRoutes}
				isDown={userDrop}
				{...(mobile ? {} : { position: "absolute", top: 50, rounded: "md" })}
			/>
		</Box>
	);
};

const UserLink = ({ user, mobile, ...props }) => {
	return user.loading ? (
		<Skeleton w={40} h={10} rounded="lg" textAlign="center"></Skeleton>
	) : user.loggedIn ? (
		<UserProfile mobile={mobile} profile={user.profile} {...props} />
	) : (
		<SpotifyButton {...props} />
	);
};

export default UserLink;
