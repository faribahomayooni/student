/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import ProgressCircle from 'react-native-progress-circle';

const Progress = () => {
  return (
    <ProgressCircle
      outerCircleStyle={cs.progressCircle}
      percent={87}
      radius={55}
      borderWidth={13}
      color="#5467FD"
      shadowColor="#A8B0F2"
      bgColor="#F2F3F7">
      <Text style={cs.fontProgress}>{'87%'}</Text>
    </ProgressCircle>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Progress);
