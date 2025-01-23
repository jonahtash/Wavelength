import React, { Component } from 'react';
import wheel_img from './WHEEL.png';
import hidden_wheel from './hidden_wheel.png';


class Wheel extends Component {
    render() {
    var rotation_string = "rotate(" + this.props.rotation + "deg)";
    if (!this.props.hidden) {
      return (
        <img src={wheel_img} style={{
            transform: rotation_string,
            position: 'absolute',
            width: 800
        }} />
        );
    } else {
        return (
            <img src={hidden_wheel} style={{position: 'absolute', width: 800}}/>
        )
    }
    }
  }
  
  export default Wheel;