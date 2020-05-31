import React from "react";

const levelStyle = {
	textAlign: "center",
	paddingTop: "100px",
};

const buttonStyle = {
	height: "100px",
	width: "150px",
	borderRadius: "4px",
	margin: "30px",
};

const Level = ({ data, onOptionClick, levelPassed }) => {
	return (
		<div style={levelStyle}>
			<h1>{data.line}</h1>
			{Object.keys(data.options).map(opt => (
				<button key={opt} id={opt} onClick={onOptionClick} style={buttonStyle}>
					{data.options[opt].title}
					<br />
					{data.options[opt].artist}
				</button>
			))}
			{levelPassed !== undefined && levelPassed == true && <h2>Right answer!</h2>}
			{levelPassed !== undefined && levelPassed == false && <h2>Wrong answer :(</h2>}
		</div>
	);
};

export default Level;
