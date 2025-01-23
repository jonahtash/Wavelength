import logo from './logo.svg';
import './App.css';
import ContinuumCard from './ContinuumCard';
import Box from '@mui/material/Box';
import { WORD_PAIRS } from './words';
import Wheel from './Wheel';
import { Button, Stack } from '@mui/material';
import React, { Component, createRef } from 'react';
import { findDOMNode } from 'react-dom';


class App extends Component {
  canvasRef = createRef(null);
  constructor(props) {
    super(props);
    this.state = {
      card_index: Math.floor(Math.random() * WORD_PAIRS.length),
      rotation: Math.random() * 160 - 80,
      turn: 0,
      choiceMade: false,
      prevX: 0,
      prevY: 0
    };
    this.newGame = this.newGame.bind(this);
    this.hideWheel = this.hideWheel.bind(this);
    this.revealWheel = this.revealWheel.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  hideWheel() {
    this.setState({
      turn: 1
    });
  }

  revealWheel() {
    this.setState({
      turn: 2
    });
    if (this.state.choiceMade) {
      const canvas = this.canvasRef.current;
      var ctx = canvas.getContext("2d");
      var center = canvas.width / 2;
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "red";
      ctx.moveTo(center, center);
      ctx.lineTo(this.state.prevX, this.state.prevY);
      ctx.stroke();
      ctx.closePath();
    }
  }

  newGame() {
    this.setState({
      turn: 0,
      card_index: Math.floor(Math.random() * WORD_PAIRS.length),
      rotation: Math.random() * 160 - 80,
      choiceMade: false
    });
    const canvas = this.canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  }
  handleMouseDown(event){
    if (this.state.turn != 1) {
      return;
    }
    
    const canvas = this.canvasRef.current;
    if (event.offsetY < canvas.height / 2) {
      var center = canvas.height / 2;
      var vX = event.offsetX - center;
      var vY = event.offsetY - center;
      var uX = vX / (Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2)));
      var uY = vY / (Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2)));
      var ctx = canvas.getContext("2d");
      ctx.lineWidth = 4;
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.moveTo(center, center);
      ctx.lineTo(uX * center + center, uY * center + center);
      ctx.stroke();
      this.setState({choiceMade: true,
        prevX: uX * center + center,
        prevY: uY * center + center
      });
      ctx.closePath();
    }
  }
  handleMouseMove(event) {
    if (this.state.turn != 1) {
      return;
    }
    const canvas = this.canvasRef.current;
    if (event.offsetY < canvas.height / 2) {
      var center = canvas.height / 2;
      var vX = event.offsetX - center;
      var vY = event.offsetY - center;
      var uX = vX / (Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2)));
      var uY = vY / (Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2)));
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.closePath();
      ctx.lineWidth = 4;
      if (this.state.choiceMade) {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(center, center);
        ctx.lineTo(this.state.prevX, this.state.prevY);
        ctx.stroke();
        ctx.closePath();
      }
      ctx.beginPath();
      ctx.strokeStyle = "pink";
      ctx.moveTo(center, center);
      ctx.lineTo(uX * center + center, uY * center + center);
      ctx.stroke();
      ctx.closePath();
    }
  }
  handleMouseUp(event) {
    if (this.state.turn != 1) {
      return;
    }
  }

  render() {
    var selected_pair = WORD_PAIRS[this.state.card_index]
    var button_text = "";
    var button_action = null;
    if (this.state.turn == 0) {
      button_text = "Hide Wheel";
      button_action = this.hideWheel;
    } else if (this.state.turn == 1) {
      button_text = "Reveal";
      button_action = this.revealWheel;
    } else if(this.state.turn == 2) {
      button_text = "Next Round";
      button_action = this.newGame;
    }
    return (
      <div className="App" style={{display: 'flex', justifyContent: 'center'}}>
        <Stack>
          <Box sx={{display: 'inline-block'}}>
            <Wheel 
              rotation={this.state.rotation} 
              hidden={this.state.turn == 1}
            />
            <canvas id={"canvas"} style={{zIndex: 20, position: 'relative'}} ref={this.canvasRef}
                        width={800}
                        height={800}
                        onMouseDown={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseDown(nativeEvent);
                            }}
                        onMouseMove={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseMove(nativeEvent);
                            }}    
                        onMouseUp={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseUp(nativeEvent);
                            }}
                />
          </Box>
          <Box sx={{justifyItems: "center", margin: 2}}>
            <ContinuumCard left={selected_pair[0]} right={selected_pair[1]}/>
          </Box>
            <Button variant="contained" onClick={button_action}>
              {button_text}
            </Button>

        </Stack>
      </div>
    );
  }
}

export default App;
