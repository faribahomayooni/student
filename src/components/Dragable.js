import React, { Component } from "react";
import {commonStyle as cs} from './../styles/common/styles';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,Image,
  Text
} from "react-native";

export default class Draggable extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

 
  componentWillMount() { 
    // console.warn("paaaaaaaaaaaaaaaaaaaaaaaaaaaaaan",this.state.pan)
    this._val = { x:0, y:0 }
   
    this.state.pan.addListener((value) =>  {
      this.props.changebuleboxSize(value,this.props.index)
      this._val = value});
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),   
    });
  }

  render() {
    let attendance_Img = require('./../assets/images/student/dashboard/Image217.png');
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, cs.boxesPairWrapper]}
        >
          <Image style={cs.boxPairImageStyle} source={this.props.image} />
          <Text style={cs.pairBoxFont}>{this.props.imagetext}</Text>
        </Animated.View>
    );
  }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});