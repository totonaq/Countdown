import React from 'react';
import PropTypes from 'prop-types';

function ChooseButton(props) {
	
	return (
		<button
			ref={props.getChooseBtnRef}
			onClick={props.toggleSelect} 
			className="choose">
			{props.buttonTitle}
		</button>
	)
	
}

ChooseButton.propTypes = {
	getChooseBtnRef: PropTypes.func,
	onClick: PropTypes.func,
	buttonTitle: PropTypes.string
}

export default ChooseButton