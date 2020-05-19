import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/helper';
import Toast from './src/components/Toast';
import AppNavigator from './src/routers/AppNavigator';
import NavigationService from './src/routers/NavigationService';
import messaging from '@react-native-firebase/messaging';
 import firebase from "react-native-firebase";
// import { StackActions } from '@react-navigation/native';



// import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      notification:[],
      // count:0,
    }
      global.url = 'http://192.168.1.46:3100/';
    // global.url = 'http://192.168.1.33:3100/';
  //  global.url='http://85.214.123.68:3100/'
  // global.url = 'http://94.101.128.11:3100/';
    global.App = this;
  }

  

  
  componentDidMount=()=>{
     
    messaging().onMessage( remoteMessage => {
      
      // console.warn("remotemessaging",remoteMessage)
      this.setState({notification:[
        Object.assign({}, remoteMessage), ...this.state.notification
       
      ]})
   
     
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
    
      this.setState({notification:[
        Object.assign({}, remoteMessage), ...this.state.notification
       
      ]})
    });
 }


 
 async createNotificationListeners() {
  
  this.notificationOpenedListener = messaging
    .notifications()
    .onNotificationOpened(async (notificationOpen) => {
      NavigationService.navigate('Message');
    });

  this.messageListener = messaging().onMessage(message => {
    // console.log(JSON.stringify(message));
  });
}
  
  render() {
    // console.warn("&&&&&&&&&&&&&notification in app component&&&&&&&&&&&&&&",store)
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator
            screenProps={this.state.notification}
          // counter={this.state.count}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          <Toast ref={r => (this.toast = r)} />
        </View>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
