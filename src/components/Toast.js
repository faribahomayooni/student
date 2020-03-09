import React, {Component} from 'react';
import {View, Text, Animated, Modal} from 'react-native';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.toastOpacityAnimatedValue = new Animated.Value(0);
    this.state = {text: '', isVisible: false};
  }
  show(txt) {
    this.setState({isVisible: true});
    this.setState({text: txt}, () => {
      Animated.sequence([
        Animated.timing(this.toastOpacityAnimatedValue, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(this.toastOpacityAnimatedValue, {
          toValue: 0,
          duration: 500,
          delay: 1500,
        }),
      ]).start(() => {
        this.setState({isVisible: false});
      });
    });
  }
  render() {
    const {isVisible} = this.state;
    return isVisible ? (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        style={{zIndex: 9999999}}>
        <Animated.View
          style={{
            opacity: this.toastOpacityAnimatedValue,
            backgroundColor: 'red',
            position: 'absolute',
            bottom: 180,
            left: 50,
            right: 50,
            height: 40,
            borderWidth: 1,
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: 'red',
            zIndex: 9999999,
          }}>
          <Text style={{alignSelf: 'center', color: '#fff'}}>
            {this.state.text}
          </Text>
        </Animated.View>
      </Modal>
    ) : null;
  }
}
