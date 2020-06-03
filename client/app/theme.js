import { theme, ThemeProvider } from "@chakra-ui/core";
import React from "react";

const customTheme = {
	...theme,
	colors: {
		...theme.colors,
		purple: {
			50: "#fee5ff",
			100: "#edb5fe",
			200: "#db85fa",
			300: "#c655f7",
			400: "#b025f3",
			500: "#8f0dda",
			600: "#6a08aa",
			700: "#54057b",
			800: "#37024b",
			900: "#17001d",
		},
		pink: {
			50: "#ffe2f4",
			100: "#ffb3d7",
			200: "#fc83ba",
			300: "#fa529f",
			400: "#f72283",
			500: "#dd086a",
			600: "#ad0252",
			700: "#7d003b",
			800: "#4d0023",
			900: "#1f000e",
		},
		darkBlue: "#3a0ca3",
		blue: "#4361ee",
		lightBlue: "#4cc9f0",
	},
	icons: {
		...theme.icons,
		hamburger: {
			path: <path fill="currentColor" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />,
			// If the icon's viewBox is `0 0 24 24`, you can ignore `viewBox`
			viewBox: "0 0 20 20",
		},
	},
};

const Theme = ({ children }) => <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;

export default Theme;
