import React, { Component } from 'react';

import InputField from './components/InputField';
import TimeField from './components/TimeField';
import ButtonField from './components/ButtonField';
import SoundField from './components/SoundField';
import './App.css';

import addZero from './functions/add-zero';

class Timer extends Component {
  
  state = {
    hour: '',
    min: '',
    sec: '',
    ms: 0,
    isPaused: true,
    isStopped: true,
    remainingTime: 0,
    settledTime: 0,
    shouldRing: false
  }

  componentDidUpdate() {
    this.handleHourLimit()
  }

  handleNumberChange = (e) => {
    let {name, value} = e.target;
    
    if (name === 'hour') {
      value = Math.min(value, 24);
    } else {
      value = Math.min(value, 59);
    }

    this.setState({[name]: addZero(value)});
    
  }

  handleHourLimit() {
    if (this.state.min + this.state.sec > 0 && this.state.hour > 23) {
      this.setState({hour: 23});
    }
  }

  handleWrongSymbol = (e) => {
    if (isNaN(String.fromCodePoint(e.keyCode)) && 
        e.keyCode !== 8 && 
        e.keyCode !== 37 &&
        e.keyCode !== 38 &&
        e.keyCode !== 39 &&
        e.keyCode !== 40
      ) {
      
      e.preventDefault();
    }
  }

  handleTimerManaging = (e) => {

    let sum = ((+this.state.hour * 60 + 
      +this.state.min) * 60 + 
      +this.state.sec) * 1000 + 
      +this.state.ms;

    this.setState({
      remainingTime: sum
    })

    if (!this.state.settledTime) {
      this.setState({
        settledTime: sum
      })
      
    }
  
    let goalTime;

    if (e.target.closest('.start')) {

      if (sum === 0) return

      let startTime = +new Date();
      goalTime = +new Date(startTime + sum);

      this.setState({
        isPaused: false,
        isStopped: false
      });

    } else if (e.target.closest('.pause')) {
      
      this.setState({
        isPaused: true
      });

    } else {
      
      if (this.state.isStopped) return;

      this.setState({
        isPaused: true,
        isStopped: true
      });

    }

    if (sum > 0) {
      this.runTimer(sum, goalTime);
    }
    
  }

  runTimer(sum, goalTime) {
    window.requestAnimationFrame((function run() {
      this.setState({
        remainingTime: sum
      })

      if (!this.state.isStopped && sum === 0) {
        this.setState({shouldRing: true})
     
        this.stopTimer();
 
      } else if (this.state.isStopped) {
        
        this.stopTimer();
     
      }

      if (sum > 0) {

        if (!this.state.isPaused) {

          let currentTime = Date.now();

          sum = Math.max(goalTime - currentTime, 0);

          let hour = Math.floor(sum / 
            (3600 * 1000))
          let min = Math.floor(sum / 
            60000 - hour * 60);
          let sec = Math.floor(sum / 
            1000 - hour * 3600 - min * 60);
          let ms = sum - 
            (hour * 3600 + min * 60 + sec) * 1000;

          this.setState({hour, min, sec, ms})
          
          window.requestAnimationFrame(run.bind(this));

        }

      }

    }).bind(this))

  }

  stopTimer() {
    this.setState({
      hour: '',
      min: '',
      sec: '',
      ms: 0,
      isPaused: true,
      isStopped: true,
      settledTime: 0,
    })
  }

  shouldRingToFalse = () => {
    this.setState({shouldRing: false})
  }

  render() {
    const data = this.state;
  
    return (
      <div>
        <InputField 
          onNumberChange={this.handleNumberChange}
          onWrongSymbol={this.handleWrongSymbol}
          hour={data.hour}
          min={data.min}
          sec={data.sec}
          isStopped={data.isStopped}
          settledTime={data.settledTime}
          remainingTime={data.remainingTime}
        />
        
        <TimeField 
          hour={data.hour}
          min={data.min}
          sec={data.sec}
          ms={data.ms}
        />
       
        <ButtonField 
          manageTimer={this.handleTimerManaging}
          isPaused={data.isPaused}
        />

        <SoundField 
          shouldRing={data.shouldRing}
          updateShouldRing={this.shouldRingToFalse}
        />
      </div>
    );
  }
}

export default Timer;