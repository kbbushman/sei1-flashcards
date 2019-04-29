import React from 'react';

const colors = ['#673ab7', '#2196f3', '#26a69a', '#e91e63'];

// This is a functional component and does NOT have any lifecycle methods
let Definition = (props) => {
	let { def, index } = props;

	const styles = {
		color: 'white',
		padding: '10px',
		backgroundColor: colors[index],
	};

	return (
		<div className="card text-center" style={styles}>
			<h5>Definition {index + 1}</h5>
			<p>{def}</p>
		</div>
	);
};

export default Definition;
