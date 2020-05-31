import React from "react";

const Level = ({ data, onOptionClick }) => {
	return (
		<div>
			<h1>{data.line}</h1>
			{Object.keys(data.options).map(opt => {
				<button key={opt} id={opt} onClick={onOptionClick}>
					{data.options[opt]}
				</button>;
			})}
		</div>
	);
};

export default Level;
