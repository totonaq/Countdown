import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';

class InputField extends Component {
	
	onChangeInput = (e) => {
		this.props.onNumberChange(e)
	}

	checkSymbol = (e) => {
		this.props.onWrongSymbol(e)
	}
	
	render() {
		
		const measure = ['hour', 'min', 'sec'];
		
		let inputs = measure.map((item, index) => {

			let inputValue;

			if (this.props.isStopped) {
				inputValue = this.props[item];
			} else {
				inputValue = '';
			}

			let colon = item !== 'sec' ? ':' : ''
			
			return (
				<Fragment key={index}>
					<input
						type="text"
						name={item} 
						className={`input-${item}`}
						value={inputValue > 0 ? inputValue : ''} 
						placeholder={item[0]}
						onInput={this.onChangeInput}
						onKeyDown={this.checkSymbol}
						disabled={!this.props.isStopped}
					/>{colon}
				</Fragment>
			)
		})

		let hideInputs = '';
		const {isStopped, settledTime, remainingTime} = this.props

		if (!this.props.isStopped) {
			hideInputs = ' hide-inputs';
		}
		
		return (
			<div className="input-field-wrap">

				<div className={"inputs-wrap" + hideInputs}>
					{inputs}
				</div>

				<ProgressBar
					isStopped={isStopped}
					settledTime={settledTime}
					remainingTime={remainingTime}
				/>

			</div>
		)
	}
}

InputField.propTypes = {
	onNumberChange: PropTypes.func,
	onWrongSymbol: PropTypes.func,
	isStopped: PropTypes.bool,
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
	])
}

export default InputField