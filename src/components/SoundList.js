import React from 'react';
import PropTypes from 'prop-types';

function SoundList(props) {
	
	function onItemClick(e) {
		props.selectSound(e)
	}

	const urls = [
		{
			name: 'No sound',
			url: ''
		},
		{
			name: 'Basic bell',
			url: 'basic'
		},
		{
			name: 'Alarm clock',
			url: 'alarm'
		},
		{
			name: 'Chime',
			url: 'chime'
		},
		{
			name: 'Daybreak',
			url: 'daybreak'
		},

	]

	const close = props.isListOpen ? '' : ' close';

	return (
		<ul className={"select-sound" + close}>
			{urls.map((item, index) => {
				return (
					<li key={index} onClick={onItemClick}>
						<a href={item.url}>{item.name}</a>
					</li>
				)
			})}
		</ul>
	)
	
}

SoundList.propTypes = {
	isListOpen: PropTypes.bool,
	selectSound: PropTypes.func
}

export default SoundList