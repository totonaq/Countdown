import React, { Component } from 'react';

import basic from './../ringtones/basic_bell.mp3';
import alarm from './../ringtones/alarm_clock.mp3';
import chime from './../ringtones/chime.mp3';
import daybreak from './../ringtones/daybreak.mp3';

import PropTypes from 'prop-types';

class AudioPlayer extends Component {

	componentDidUpdate() {
			
		if (this.props.isAudioPlaying) {

			let now;
			let start = Date.now();

			function cling() {
				
				now = Date.now();

				if (now - start < 6000 && this.props.isAudioPlaying) {
				
					this.audio.play();
					window.requestAnimationFrame(cling.bind(this))
				
				} else {

					this.props.stopPlaying()
					
				}

			}

			window.requestAnimationFrame(cling.bind(this))

		} else {
		
			this.audio.pause();

		}

	}

	getAudioRef = (node) => {
		this.audio = node
	}

	render() {
		
		const src = this.props.audioFileName;

		const fileList = {
			basic,
			alarm,
			chime,
			daybreak
		}

		return (
			<audio 
				ref={this.getAudioRef} 
				className="player" 
				src={fileList[src]} 
				loop
			/>
		)
	}
}

AudioPlayer.propTypes = {
	audioFileName: PropTypes.string,
	isAudioPlaying: PropTypes.bool,
	stopPlaying: PropTypes.func
	
}

export default AudioPlayer