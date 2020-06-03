import React, { useState, useEffect } from "react";

const app_style = {
	paddingTop: "100px",
	textAlign: "center",
};

const button_style = {
	height: "60px",
	width: "120px",
	background: 'url("https://www.scdn.co/i/_global/open-graph-default.png")',
	backgroundSize: "contain",
	borderRadius: "40px",
	margin: "0 auto",
};

const NewUser = () => {
	return (
		<div style={app_style} height="100%">
			<a href="/auth">
				<div style={button_style}></div>
			</a>
		</div>
	);
};

export default NewUser;
