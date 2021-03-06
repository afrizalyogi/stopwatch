import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Stopwatch project with React by Afrizal Yogi
const accurateInterval = function(fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function() {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function() {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};

// Components for Length Control including Title, Control Button and Length Time
class TimerLengthControl extends React.Component {
  render() {
    return(
      <div className="length-control">
        <div id={this.props.titleID}>{this.props.title}</div>
        <button id={this.props.minID} className="btn-level" onClick={this.props.onClick} value="-">
          <i className="fas fa-minus fa-2x"/>
        </button>
        <div id={this.props.lengthID} className="btn-level">
          {this.props.length}m
        </div>
        <button id={this.props.addID} className="btn-level" onClick={this.props.onClick} value="+">
          <i className="fas fa-plus fa-2x"/>
        </button>
      </div>
    );
  }
}

// Components of Timer and rendered content
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brkLength: 5,
      seshLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: ""
    };
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSeshLength = this.setSeshLength.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }
  setBrkLength(e) {
    this.lengthControl(
      "brkLength",
      e.currentTarget.value,
      this.state.brkLength,
      "Session"
    );
  }
  setSeshLength(e) {
    this.lengthControl(
      "seshLength",
      e.currentTarget.value,
      this.state.seshLength,
      "Break"
    );
  }
  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerState === "running") {
      return;
    }
    if (this.state.timerType === timerType) {
      if (sign === "-" && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } 
      else if (sign === "+" && currentLength !== 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } 
    else if (sign === "-" && currentLength !== 1) {
      this.setState({
        [stateToChange]: currentLength - 1,
        timer: currentLength * 60 - 60
      });
    } 
    else if (sign === "+" && currentLength !== 60) {
      this.setState({
        [stateToChange]: currentLength + 1,
        timer: currentLength * 60 + 60
      });
    }
  }
  timerControl() {
    if (this.state.timerState === "stopped") {
      this.beginCountDown();
      this.setState({ timerState: "running" });
    } 
    else {
      this.setState({ timerState: "stopped" });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  }
  beginCountDown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  }
  decrementTimer() {
    this.setState({ timer: this.state.timer - 1 });
  }
  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.timerType === "Session") {
        this.beginCountDown();
        this.switchTimer(this.state.brkLength * 60, "Break");
      } 
      else {
        this.beginCountDown();
        this.switchTimer(this.state.seshLength * 60, "Session");
      }
    }
  }
  warning(_timer) {
    if (_timer < 10) {
      this.setState({ alarmColor: { color: "#ff5555" } });
    } 
    else {
      this.setState({ alarmColor: { color: "#fff" } });
    }
  }
  buzzer(_timer) {
    if (_timer === 3) {
      this.audioBeep.play();
    }
  }
  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str
    });
  }
  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }
  reset() {
    this.setState({
      brkLength: 5,
      seshLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: ""
    });
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    return (
      <div>
        <div id="box-center">
          <div id="timer">
            <div id="timer-wrapper">
              <div id="timer-label">{this.state.timerType}</div>
              <div id="time-left" style={this.state.alarmColor}>{this.clockify()}</div>
            </div>
          </div>
          <TimerLengthControl
            addID="break-increment"
            length={this.state.brkLength}
            lengthID="break-length"
            minID="break-decrement"
            onClick={this.setBrkLength}
            title="Break Time"
            titleID="break-label"
          />
          <TimerLengthControl
            addID="session-increment"
            length={this.state.seshLength}
            lengthID="session-length"
            minID="session-decrement"
            onClick={this.setSeshLength}
            title="Session Time"
            titleID="session-label"
          />
          <div id="timer-control">
            <button id="start_stop" onClick={this.timerControl}>
              <i className="fas fa-pause fa-2x"/>
              <i className="fas fa-play fa-2x"/>
            </button>
            <button id="reset" onClick={this.reset}>
              <i className="fas fa-redo-alt fa-2x"/>
            </button>
          </div>
        </div>
        <div id="credit">
          {" "}
          <i className="fas fa-code"></i>&nbsp; with &nbsp;<i className="fas fa-heart"></i>&nbsp; by <a href="https://afrizalyogi.github.io" target="_blank" rel="noopener noreferrer">Afrizal Yogi</a>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://cdn.jsdelivr.net/gh/afrizalyogi/stopwatch@main/src/assets/BeepSound.wav"
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Timer/>, 
  document.getElementById("app")
);

reportWebVitals();