import React from 'react';
import PropTypes from 'prop-types';

function CheckButton(props) {
	
	let play, playButtonValue;

	if (props.isAudioPlaying) {
		play = 'stop';
		playButtonValue = 'Stop';
	} else {
		play = 'play';
		playButtonValue = 'Play';
	}

	return (
		<button
			onClick={props.togglePlay}
			className={play}>
			{playButtonValue}
		</button>
	)
	
}

CheckButton.propTypes = {
	togglePlay: PropTypes.func,
	isAudioPlaying: PropTypes.bool
}


export default CheckButton