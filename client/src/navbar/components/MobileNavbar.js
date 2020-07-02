import React, { useRef } from "react";
import { Icon, Button, Drawer, DrawerBody, DrawerOverlay, DrawerContent } from "@chakra-ui/core";
import UserLink from "./UserLink";
import NavbarLinks from "./NavbarLinks";

const MobileNav = ({ isOpen, onClose, routes, userRoutes, user }) => {
	const closeButton = useRef();
	return (
		<Drawer
			isOpen={isOpen}
			onClose={onClose}
			initialFocusRef={closeButton}
			style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
		>
			<DrawerOverlay style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} />
			<DrawerContent maxWidth="16rem" paddingLeft="0" paddingRight="0">
				<Icon
					cursor="pointer"
					position="absolute"
					onClick={onClose}
					alignSelf="flex-end"
					ref={closeButton}
					name="close"
					color="black"
					size="25px"
					right={5}
					top={5}
				/>
				<DrawerBody
					px="0"
					pt={100}
					d="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="flex-start"
				>
					<UserLink userRoutes={userRoutes} mobile={true} mb={5} user={user} />
					<NavbarLinks routes={routes} mobile={true} />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileNav;
