import React, { useState, useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/core";
import { Redirect } from "react-router-dom";
import Level from "./components/Level";

const DATA = {
	"1": {
		line: "It won't be 'cause my shit ain't sellin' the same",
		options: {
			"0": { id: "2JvzF1RMd7lE3KmFlsyZD8", title: "MIDDLE CHILD", artist: "J. Cole" },
			"1": { id: "007PPvZtGDYHSEhYPxqIfC", title: "Been A While", artist: "6LACK" },
			"2": { id: "0fYVliAYKHuPmECRs1pbRf", title: "Renegades", artist: "X Ambassadors" },
			"3": { id: "10KQrsptNFQ0rwr7rHYjeu", title: "GFY", artist: "Dennis Lloyd" },
		},
	},
	"2": {
		line: "Blessed to say, money ain't a thing",
		options: {
			"0": { id: "1LIAdfyn3dtGOyD30Rd5lG", title: "ocean eyes", artist: "Billie Eilish" },
			"1": {
				id: "1moShKo1RrxZ8PCrhSIf8Q",
				title: "Night Running",
				artist: "Cage The Elephant",
			},
			"2": { id: "3cHyrEgdyYRjgJKSOiOtcS", title: "Timber", artist: "Pitbull" },
			"3": {
				id: "2PC9Tl8SWVO2yhDDtJcrAi",
				title: "Setting Fires",
				artist: "The Chainsmokers",
			},
		},
	},
	"3": {
		line: "And I still don't know",
		options: {
			"0": {
				id: "52ojopYMUzeNcudsoz7O9D",
				title: "New Person, Same Old Mistakes",
				artist: "Tame Impala",
			},
			"1": { id: "2YyvWje3cEYyqgYhNUIaBJ", title: "La Di Da", artist: "Lennon Stella" },
			"2": { id: "3n69hLUdIsSa1WlRmjMZlW", title: "Breezeblocks", artist: "alt-J" },
			"3": { id: "4HUqrGAZ5f0gHRor7z9BFc", title: "Black Eyes", artist: "Bradley Cooper" },
		},
	},
	"4": {
		line: "Voice in my head, in my bed, filled with you instead",
		options: {
			"0": { id: "59QmjU5K8XQTfj9JjFNb4Z", title: "ili", artist: "TroyBoi" },
			"1": {
				id: "5SxkdsY1ufZzoq9iXceLw9",
				title: "no tears left to cry",
				artist: "Ariana Grande",
			},
			"2": { id: "5efvxYn0J1q8iuIZBqpDD7", title: "Lowlife", artist: "That Poppy" },
			"3": { id: "6WMkilBgcSoPX8Ypt6XFUO", title: "Say It", artist: "Flume" },
		},
	},
	"5": {
		line: "Stepping in, 'bout to get it but you ever look hot",
		options: {
			"0": {
				id: "5lzp3WgXCd94gI7cQaQ9bQ",
				title: "NEVER GONNA LIKE YOU",
				artist: "Bea Miller",
			},
			"1": { id: "6y68QK2SwC38YxsbxHrA8I", title: "Mad Love", artist: "Sean Paul" },
			"2": { id: "6VRhkROS2SZHGlp0pxndbJ", title: "Bangarang", artist: "Skrillex" },
			"3": { id: "6mUvUHu6omMJPKwW4g5DR9", title: "B-A-B-Y", artist: "Carla Thomas" },
		},
	},
};

const Loading = () => (
	<Spinner
		pos="absolute"
		top="50%"
		left="50%"
		thickness="4px"
		speed="0.65s"
		emptyColor="gray.200"
		color="blue.500"
		size="xl"
	/>
);

const Game = ({ state, ...actions }) => {
	const [level, setLevel] = useState();
	const [loading, setLoading] = useState(true);
	const handleLevelChange = level => {
		if (level >= Object.keys(state.data).length) {
			level = 1;
		}
		actions.updateLevel(level);
		setLevel(level);
	};
	useEffect(() => {
		const time = setTimeout(() => {
			handleLevelChange(1);
			setLoading(false);
		}, 3000);
		return () => clearTimeout(time);
	}, []);
	useEffect(() => {
		console.log(`USE-EFFECT: Level changing to ${level}`);
		const interval = setInterval(() => handleLevelChange(level + 1), 10000);
		return () => clearInterval(interval);
	}, [level]);
	if (!state.data || (typeof state.data == "object" && Object.keys(state.data).length == 0)) {
		console.log("Redirecintg");
		return <Redirect to="/" />;
	}
	if (loading) {
		return <Loading />;
	}
	return (
		<Box
			className="game-body"
			flexGrow="2"
			d="flex"
			flexDirection="column"
			h="full"
			w="full"
			alignItems="center"
		>
			<Level
				levelNumber={level}
				line={state.data[level].line}
				options={Object.values(state.data[level].options)}
				signalChoice={actions.signalChoice}
				listenForLevelResponse={actions.listenForLevelResponse}
				loading={state.progress.loading}
				passed={state.progress.gameProgress && state.progress.gameProgress[level]}
			/>
		</Box>
	);
};

export default Game;
