import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends Component {
	
	componentDidMount() {
		this.draw()
	}

	componentDidUpdate() {
		this.draw()
	}

	getCanvasRef = (node) => {
		this.elem = node;
	}

	draw() {
		const canvas = this.elem;
		const width = canvas.width = canvas.parentNode.clientWidth;
		const height = canvas.height = canvas.parentNode.clientHeight;
		const rate = this.props.remainingTime / 
			this.props.settledTime;

		const ctx = canvas.getContext('2d');
		const startColor = '#309dce';//rgb(48, 193, 206);
		const finishColor = '#ff6d6d'; //rgb(255, 109, 109);

		if (rate < .2) {
			let color = this.setTransition(400, startColor, finishColor);
			
			ctx.fillStyle = 'rgb(' + color.currentR + ', ' + color.currentG + ', ' +
			color.currentB + ')';
		} else {
			ctx.fillStyle = startColor;
		}

		ctx.fillRect(0, 0, width * rate, height);
		
	}

	setTransition(transitionTime, startColor, finishColor) {

		let startR = '0x' + startColor.slice(1, 3);
		let finishR = '0x' + finishColor.slice(1, 3);
		let startG = '0x' + startColor.slice(3, 5);
		let finishG = '0x' + finishColor.slice(3, 5);
		let startB = '0x' + startColor.slice(5);
		let finishB = '0x' + finishColor.slice(5);

		let timeFringe = .2 * this.props.settledTime - this.props.remainingTime;

		let timePassed = Math.max(timeFringe, 17);

		let timeRate = transitionTime / timePassed;

		let partR = Math.round((finishR - startR) / timeRate);
		let partG = Math.round((finishG - startG) / timeRate);
		let partB = Math.round((finishB - startB) / timeRate);

		let currentR = finishR - startR > 0 ? 
			Math.min(+finishR, (+startR + partR)) : 
			Math.max(+finishR, (+startR + partR));
		let currentG = finishG - startG > 0 ? 
			Math.min(+finishG, (+startG + partG)) : 
			Math.max(+finishG, (+startG + partG));
		let currentB = finishB - startB > 0 ? 
			Math.min(+finishB, (+startB + partB)) : 
			Math.max(+finishB, (+startB + partB));

		return {
			currentR: currentR,
			currentG: currentG,
			currentB: currentB
		};
	}

	render() {
		let hideBar = (this.props.isStopped) ? ' hide-bar' : ''
		return (
			<div className={"progress-bar" + hideBar}>
				<canvas ref={this.getCanvasRef} className="line" width="260" height="31" />
			</div>
		)
	}
}

ProgressBar.propTypes = {
	isStopped: PropTypes.bool,
	settledTime: PropTypes.number,
	remainingTime: PropTypes.number
}

export default ProgressBar