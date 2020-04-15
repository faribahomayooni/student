/* eslint-disable react-native/no-inline-styles */
import React, {Component,useState,useEffect} from 'react';
import {Text, View, TouchableOpacity, Image,AsyncStorage} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {apiActions} from '../actions';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';


class DashboardBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    this.checkPermission();
    const {dispatch} = this.props;
    dispatch(apiActions.loadBasicList(30));
  }



   registerAppWithFCM=async ()=> {
    await messaging().registerDeviceForRemoteMessages();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  render() {
    let attendance_Img = require('./../assets/images/student/dashboard/Image217.png');
    let messages_Img = require('./../assets/images/student/dashboard/Image218.png');
    let help_Img = require('./../assets/images/student/dashboard/Image220.png');
    let anything_Img = require('./../assets/images/student/dashboard/Image221.png');
    let travel_Img = require('./../assets/images/student/dashboard/Image222.png');
    const {loadBasicList} = this.props;
    return (
      <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Presence');
          }}
          style={cs.boxesWrapper}>
          <Image style={cs.boxImageStyle} source={attendance_Img} />
          <Text style={cs.attendanceFont}>Taking Attendance</Text>
        </TouchableOpacity>
        <View style={cs.pairBox}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Messages');
            }}
            style={cs.boxesPairWrapper}>
            <Image style={cs.boxPairImageStyle} source={messages_Img} />
            <Text style={cs.pairBoxFont}>Lees berichten</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('HelpCentre');
            }}
            style={cs.boxesPairWrapper}>
            <Image style={cs.boxPairImageStyle} source={help_Img} />
            <Text style={cs.pairBoxFont}>Help</Text>
          </TouchableOpacity>
        </View>
        <View style={cs.pairBox}>
          <TouchableOpacity style={cs.boxesPairWrapper}>
            <Image style={cs.boxPairImageStyle} source={anything_Img} />
            <Text style={cs.pairBoxFont}>Nog iets?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('TravelsCostSetting', {
                basicListData: loadBasicList,
              });
            }}
            style={cs.boxesPairWrapper}>
            <Image style={cs.boxPairImageStyle} source={travel_Img} />
            <Text style={cs.pairBoxFont}>Reiskosten</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadBasicList: state.api.loadBasic,
  };
};

export default connect(mapStateToProps)(DashboardBox);
