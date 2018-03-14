import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SoundList from './SoundList'
import ChooseButton from './ChooseButton'
import CheckButton from './CheckButton'
import AudioPlayer from './AudioPlayer'

class SoundField extends PureComponent {
	
	state = {
		isListOpen: false,
		isAudioPlaying: false,
		buttonTitle: 'Select a sound',
		audioFileName: ''
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.shouldRing) {
			this.startPlaying();
			this.props.updateShouldRing();
		}
	}

	getChooseBtnRef = (node) => {
		this.choose = node;
	}

	toggleSelect = () => {
		this.state.isListOpen ? this.closeList() :
		this.openList()
	}

	openList() {
		this.setState({
			isListOpen: true
		})

		document.addEventListener('click', this.closeOnDocumentClick)
	}

	closeList() {
		this.setState({
			isListOpen: false
		})

		document.removeEventListener('click', this.closeOnDocumentClick)
	}

	selectSound = (e) => {
		e.preventDefault();

		this.setState({
			buttonTitle: e.target.textContent,
			audioFileName: e.target.getAttribute('href')
		});

		this.closeList();
	}

	closeOnDocumentClick = (e) => {
		if (!this.choose.contains(e.target)) {
			this.closeList()
		}
	}

	togglePlay = () => {
		this.state.isAudioPlaying ? this.stopPlaying() :
		this.startPlaying()

	}

	stopPlaying = () => {
		this.setState({isAudioPlaying: false});
		
	}

	startPlaying() {
		if (this.state.audioFileName) {
			this.setState({isAudioPlaying: true});
		}
	}

	render() {
		
		return (
			<div className="sound-field-wrap">
				<div className="select-field-wrap">

					<ChooseButton
						getChooseBtnRef={this.getChooseBtnRef}
						toggleSelect={this.toggleSelect}
						buttonTitle={this.state.buttonTitle}
					/>

					<SoundList 
						isListOpen={this.state.isListOpen}
						selectSound={this.selectSound}
					/>
					
				</div>

				<div className="check-field-wrap">

					<CheckButton 
						togglePlay={this.togglePlay}
						isAudioPlaying={this.state.isAudioPlaying}
					/>

				</div>

				<div>

					<AudioPlayer 
						audioFileName={this.state.audioFileName}
						isAudioPlaying={this.state.isAudioPlaying}
						stopPlaying={this.stopPlaying}
					/>

				</div>
			</div>
		)
	}
}

SoundField.propTypes = {
	shouldRing: PropTypes.bool,
	updateShouldRing: PropTypes.func
	
}

export default SoundField