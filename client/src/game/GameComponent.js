import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Heading, SimpleGrid, Spinner } from "@chakra-ui/core";
import { Redirect } from "react-router-dom";

/* const data = {
	1: {
		line: "And she'll do anything for the limelight",
		options: {
			"0": { id: "0GxQ1A5L9xnMOytbP6eKBG", title: "What Lovers Do", artist: "Maroon 5" },
			"1": { id: "1RG8MABX0VciDk6WYb8pBv", title: "This Afternoon", artist: "Nickelback" },
			"2": { id: "1SfoXU9q0EZtlgSLlrYBju", title: "Chains", artist: "Nick Jonas" },
			"3": { id: "6C7RJEIUDqKkJRZVWdkfkH", title: "Stronger", artist: "Kanye West" },
		},
	},
	2: {
		line: "You'll always be alone",
		options: {
			"0": {
				id: "1rqqCSm0Qe4I9rUvWncaom",
				title: "High Hopes",
				artist: "Panic! At The Disco",
			},
			"1": { id: "6XXYdF6pJR1K3wKvuxmu7n", title: "Feel Me", artist: "Selena Gomez" },
			"2": { id: "2gQaQUhDCNGfBVXTvxAmXQ", title: "Shout", artist: "Tears For Fears" },
			"3": { id: "3G9zeErd0kMx012kmYUrm7", title: "Lose My Cool", artist: "Amber Mark" },
		},
	},
	3: {
		line: "Happy you were mine, it sucks that it's all ending",
		options: {
			"0": { id: "4AOpEhqA7zHxQjkHmRrAp7", title: "This Girl", artist: "Kungs" },
			"1": { id: "4YK3zrLBWbsb8lVHVFy0sX", title: "Find Someone", artist: "A R I Z O N A" },
			"2": { id: "5GoWczqfKJr4kBO93ClKa2", title: "Aura", artist: "Dennis Lloyd" },
			"3": { id: "7HnkUNPrhRurdGEm9nRYFH", title: "Death & Taxes", artist: "Daniel Caesar" },
		},
	},
	4: {
		line: "And I can see it in your eyes, yeah",
		options: {
			"0": {
				id: "5nPdMALTEd7HOjn16oNf2X",
				title: "Don't Go Breaking My Heart",
				artist: "Elton John",
			},
			"1": { id: "5px6upUHM3fhOP621Edp4V", title: "Physical", artist: "Dua Lipa" },
			"2": { id: "64pOFadkuzz5H6T6tvEPGg", title: "Using", artist: "RITUAL" },
			"3": { id: "14BPKhtTkVVTwSfWslRJW9", title: "Gimme", artist: "BANKS" },
		},
	},
	5: {
		line: "Ari a natus la-te adua",
		options: {
			"0": {
				id: "66W1g0F87vJhqmgskGlw7F",
				title: "Bitch, Don't Kill My Vibe",
				artist: "Deluxe Trax",
			},
			"1": { id: "54CAG8n70kKVbFV6l1zF4G", title: "Adiemus", artist: "Karl Jenkins" },
			"2": { id: "6ccXkAVQzTB4EQqGfyMM8Q", title: "Notice Me", artist: "Scotty Sire" },
			"3": { id: "7cZbVLrtLIFDWh5YpRBS9M", title: "moodz", artist: "blackbear" },
		},
	},
}; */

const Level = ({ line, options, onClick }) => {
	return (
		<>
			<Heading size="xl">{line}</Heading>
			<SimpleGrid columns={2} spacing={10}>
				{options.map((option, i) => (
					<Box key={i} textAlign="center">
						<Button value={i} onClick={onClick}>
							{option.title} - {option.artist}
						</Button>
					</Box>
				))}
			</SimpleGrid>
		</>
	);
};

const Game = ({ state, ...actions }) => {
	console.log(`progress: ${JSON.stringify(state.progress)}`);
	const [level, setLevel] = useState();
	const [loading, setLoading] = useState(true);
	console.log(`loading: ${loading}, level ${level}`);
	const handleLevelChange = level => {
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
		const interval = setInterval(() => handleLevelChange(level + 1), 10000);
		return () => clearInterval(interval);
	}, [level]);
	const handleOptionClick = e => {
		const option = e.target.value;
		actions.signalChoice(option, level);
		actions.listenForLevelResponse();
	};
	if (!state.data || (typeof state.data == "object" && Object.keys(state.data).length == 0)) {
		console.log("Redirecintg");
		return <Redirect to="/" />;
	}
	if (loading) {
		return (
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
	}
	console.log(`loading: ${loading}, data: ${JSON.stringify(state.data)}`);
	return (
		<Box
			className="game-body"
			flexGrow="2"
			d="flex"
			flexDirection="column"
			justifyContent="space-evenly"
			h="full"
			w="full"
			alignItems="center"
		>
			<Level
				onClick={handleOptionClick}
				line={state.data[level].line}
				options={Object.values(state.data[level].options)}
			/>
		</Box>
	);
};

export default Game;
