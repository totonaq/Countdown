import React from 'react';
import PropTypes from 'prop-types';

import addZero from './../functions/add-zero';

function TimeField(props) {

	return (
		<div className="time-field-wrap">
			<span className="hour">{addZero(props.hour)}</span>
			<span className="colon">:</span>
			<span className="min">{addZero(props.min)}</span>
			<span className="colon">:</span>
			<span className="sec">{addZero(props.sec)}</span>
			<span className="ms">{addZero(props.ms, true)}</span>
		</div>
	)
	
}

TimeField.propTypes = {
	hour: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	min: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	sec: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	ms: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
}

export default TimeField; 