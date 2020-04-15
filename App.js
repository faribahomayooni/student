import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/helper';
import Toast from './src/components/Toast';
import AppNavigator from './src/routers/AppNavigator';
import NavigationService from './src/routers/NavigationService';


// import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {
  constructor(props) {
    super(props);
  // global.url = 'http://192.168.1.46:3100/';
    // global.url = 'http://192.168.1.33:3100/';
  
    global.url = 'http://94.101.128.11:3100/';
    global.App = this;
  }

  // componentDidMount=()=> {
  //   this.registerAppWithFCM()
  //  messaging().hasPermission()
  //   .then(enabled => {
  //     if (enabled) {
  //       // alert('Yes')
  //     } else {
  //       // alert('No')
  //     } 
  //   });
 
  // }


  //  registerAppWithFCM=async ()=> {
  //   await messaging().registerDeviceForRemoteMessages();
  // }


  


 
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator
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
