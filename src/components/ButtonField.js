import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ButtonField extends PureComponent {

	onButtonClick = (e) => {
		this.props.manageTimer(e);
	}

	render() {
		
		const btnClass = this.props.isPaused ? "start" : "pause"
		return (
			<div className="button-field-wrap">
				<button 
					className={btnClass} 
					onClick={this.onButtonClick}
				/>
				<button 
					className="stop" 
					onClick={this.onButtonClick}
				/>
			</div>
		)
		
	}
}

ButtonField.propTypes = {
	manageTimer: PropTypes.func,
	isPaused: PropTypes.bool
}

export default ButtonField;