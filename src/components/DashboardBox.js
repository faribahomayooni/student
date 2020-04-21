/* eslint-disable react-native/no-inline-styles */
import React, {Component,useState,useEffect} from 'react';
import {Text, View, TouchableOpacity, Image,AsyncStorage,Alert} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {apiActions} from '../actions';
import {connect} from 'react-redux';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';


class DashboardBox extends Component {
  constructor(props) {
    super(props);
  }

async componentDidMount() {
    
    this.checkPermission();
    const {dispatch} = this.props;
    dispatch(apiActions.loadBasicList(30));
    this.SaveTokenwithapi()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
     });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
       console.warn('Message handled in the background!', remoteMessage);
      });
      // messaging().onNotificationOpenedApp(remoteMessage => {
      //  Alert.alert(
      //     'Notification caused app to open from background state:',
      //     remoteMessage.notification,
      //   );
      // });
      
      // const notificationOpen = await firebase.notifications().getInitialNotification();
      // console.warn("notification",notificationOpen)
      // if (notificationOpen) {
      //   this.onPressNotification(notificationOpen.notification.data);    
      //   firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId) 
      // }
   
  }



   registerAppWithFCM=async ()=> {
    await messaging().registerDeviceForRemoteMessages();
  }

  async checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.warn("@@@@@@@@@@@@@@@@@",fcmToken)
    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

SaveTokenwithapi= async()=>{
  axios
  .post(
    global.url + 'api/user/saveFirebase',
    {
      firebaseToken: await AsyncStorage.getItem('fcmToken')
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('@token'),
      },
    },
  )
  .then(res => {
    console.warn("tokenfcm",res.data)
    if (res.data.msg === 'success') {
      messaging().onNotificationOpenedApp(remoteMessage => {
        alert(remoteMessage.notification)
        console.warn(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      
    }
  })
  .catch(error => {
    console.warn("####3333333333333",error);
  });
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
          {/* <View  style={{backgroundColor:"red",width:50,height:100,borderRadius:50}}></View> */}
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
