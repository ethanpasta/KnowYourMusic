/** With the help of "https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj" */

import { useRef, useLayoutEffect } from "react";
import useWindowDimensions from "./useWindowDimensions";

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }, inPercentage, windowDim) {
	if (!isBrowser) return { x: 0, y: 0 };

	const target = element ? element.current : document.body;
	const position = target.getBoundingClientRect();

	const posY = Math.abs(Math.floor((position.top / windowDim.height) * 100));
	const posX = Math.abs(Math.floor((position.left / windowDim.width) * 100));

	return useWindow
		? { x: window.scrollX, y: window.scrollY }
		: inPercentage
		? { x: posX, y: posY }
		: { x: Math.abs(position.left), y: Math.abs(position.top) };
}

export default function useScrollPosition(effect, inPercentage, deps, element, useWindow, wait) {
	const windowDim = useWindowDimensions();
	const position = useRef(getScrollPosition({ useWindow }, inPercentage, windowDim));

	let throttleTimeout = null;

	const callBack = () => {
		const currPos = getScrollPosition({ element, useWindow }, inPercentage, windowDim);
		effect({ prevPos: position.current, currPos });
		position.current = currPos;
		throttleTimeout = null;
	};

	useLayoutEffect(() => {
		const handleScroll = () => {
			if (wait) {
				if (throttleTimeout === null) {
					throttleTimeout = setTimeout(callBack, wait);
				}
			} else {
				callBack();
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, deps);
}
