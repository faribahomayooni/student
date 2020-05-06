/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './../screens/Home';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from './../components/Loader';
// import Login from './screens/Login';
import Presence from './../screens/Presence/Presence';
import PresenceCalendar from './../screens/Presence/PresenceCalendar';
import Messages from './../screens/Messages';
import Profile from '../screens/Profile/Profile';
import ProfileSetting from '../screens/Profile/ProfileSetting';
import ReadMessage from '../components/ReadMessage';
import Icon from 'react-native-vector-icons/FontAwesome';
import SchoolMessage from '../components/SchoolMessage';
import SendMessage from '../components/SendMessageLogin';
import SignIn from '../screens/Login/SignIn';
import EmailSetting from '../screens/Setting/EmailSetting';
import PhoneSetting1 from '../screens/Setting/FirstPhoneSetting';
import TravelsCostSetting from '../screens/Setting/TravelsCost';
import PhotoPopUp from '../screens/Setting/TravelCostPhoto';
import PasswordSetting from '../screens/Setting/PasswordSetting';
import Privacy from '../screens/Setting/Privacy';
import MySchool from '../screens/Setting/MySchool';
import AboutApp from '../screens/Setting/AboutApp';
import HelpCentre from '../screens/Setting/helpCentre';
import HelpCentreOpen from '../screens/Setting/helpCentreOpen';
import {createAppContainer} from 'react-navigation';
import {Image, View,Text,Animated, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import IconBadge from 'react-native-icon-badge';
import {connect} from 'react-redux';

// var unsubscribe = messaging().onMessage( remoteMessage => {
//   return remoteMessage
//   // const data = JSON.stringify(remoteMessage);
//   // Alert.alert('qqqqqqqqqqqqqqqqqqqq!',data);
//  });
//    console.warn("!!!!!!!!!!!!",unsubscribe)
// let RootStack;
// let tokenValue;
// // (async () => {
// //   tokenValue = await AsyncStorage.getItem('@token');
// // })();

// // AsyncStorage.getItem('@token').then(value => {
// //   tokenValue = value;
// //   return value;
// // });

// console.log(tokenValue);
// if (tokenValue !== undefined || tokenValue !== null) {
//   RootStack = createStackNavigator(
//     {
//       SplashScreen: {
//         screen: SplashScreen,
//         navigationOptions: ({navigation}) => ({
//           tabBarVisible: false,
//           title: 'Loader',
//           headerStyle: {
//             display: 'none',
//           },
//         }),
//       },

//       // SignIn: {
//       //   screen: SignIn,
//       //   navigationOptions: ({navigation}) => ({
//       //     tabBarVisible: false,
//       //     title: 'SignIn',
//       //     headerStyle: {
//       //       display: 'none',
//       //     },
//       //   }),
//       // },
//       Home: {
//         screen: Home,
//         navigationOptions: {
//           title: 'Dashboard',
//         },
//       },
//       SendMessage: {
//         screen: SendMessage,
//         navigationOptions: {
//           title: 'SendMessage',
//           /* No more header config here! */
//         },
//       },
//     },
//     {
//       defaultNavigationOptions: {
//         headerStyle: {
//           backgroundColor: '#F2F3F7',
//           elevation: 0, // remove shadow on Android
//           shadowOpacity: 0,
//         },
//         headerTitleStyle: {
//           fontSize: 22,
//           textAlign: 'center',
//           flex: 1,
//         },
//         tabBarStyle: {
//           padding: 20,
//         },
//         headerTintColor: '#31455E',
//         headerForceInset: {top: 'never', bottom: 'never'},
//       },
//     },
//   );
// } else {
//   RootStack = createStackNavigator(
//     {
//       SplashScreen: {
//         screen: SplashScreen,
//         navigationOptions: ({navigation}) => ({
//           tabBarVisible: false,
//           title: 'Loader',
//           headerStyle: {
//             display: 'none',
//           },
//         }),
//       },
//       SignIn: {
//         screen: SignIn,
//         navigationOptions: ({navigation}) => ({
//           tabBarVisible: false,
//           title: 'SignIn',
//           headerStyle: {
//             display: 'none',
//           },
//         }),
//       },
//       Home: {
//         screen: Home,
//         navigationOptions: {
//           title: 'Dashboard',
//         },
//       },
//       SendMessage: {
//         screen: SendMessage,
//         navigationOptions: {
//           title: 'SendMessage',
//           /* No more header config here! */
//         },
//       },
//     },
//     {
//       defaultNavigationOptions: {
//         headerStyle: {
//           backgroundColor: '#F2F3F7',
//           elevation: 0, // remove shadow on Android
//           shadowOpacity: 0,
//         },
//         headerTitleStyle: {
//           fontSize: 22,
//           textAlign: 'center',
//           flex: 1,
//         },
//         tabBarStyle: {
//           padding: 20,
//         },
//         headerTintColor: '#31455E',
//         headerForceInset: {top: 'never', bottom: 'never'},
//       },
//     },
//   );
// }
const RootStack = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: false,
        title: 'Loader',
        headerStyle: {
          display: 'none',
        },
      }),
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: false,
        title: 'SignIn',
        headerStyle: {
          display: 'none',
        },
      }),
    },
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Dashboard',
       headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },
    SendMessage: {
      screen: SendMessage,
      navigationOptions: {
        title: 'SendMessage',
        /* No more header config here! */
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F2F3F7',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
        flex: 1,
      },
      tabBarStyle: {
        padding: 20,
      },
      headerTintColor: '#31455E',
      headerForceInset: {top: 'never', bottom: 'never'},
    },
  },
);
const MessageStack = createStackNavigator(
  {
    Messages: {
      screen: Messages,
      navigationOptions: {
        title: 'Berichten',
      },
    },

    ReadMessage: {
      screen: ReadMessage,
      navigationOptions: {
        title: 'Berichten',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    SchoolMessage: {
      screen: SchoolMessage,
      navigationOptions: {
        title: 'SchoolMessage',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F2F3F7',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
        flex: 1,
      },
      
      tabBarStyle: {
        padding: 20,
      },
      headerTintColor: '#31455E',
      headerForceInset: {top: 'never', bottom: 'never'},
    },
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Mijn profiel',
      },
    },

    ProfileSetting: {
      screen: ProfileSetting,
      // navigationOptions: {
      //   title: 'Instellingen',
      //   headerRight: () => (
      //     <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => {}}>
      //       <Image
      //         style={{marginTop: -45, marginRight: 10, alignSelf: 'flex-end'}}
      //         source={require('./../assets/images/student/setting/Image208.png')}
      //       />
      //     </TouchableOpacity>
      //   ),
      // },
    },

    EmailSetting: {
      screen: EmailSetting,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    PhoneSetting1: {
      screen: PhoneSetting1,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    HelpCentre: {
      screen: HelpCentre,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    HelpCentreOpen: {
      screen: HelpCentreOpen,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    PasswordSetting: {
      screen: PasswordSetting,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    Privacy: {
      screen: Privacy,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    MySchool: {
      screen: MySchool,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    AboutApp: {
      screen: AboutApp,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    TravelsCostSetting: {
      screen: TravelsCostSetting,
      navigationOptions: {
        title: 'Instellingen',
         headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },

    PhotoPopUp: {
      screen: PhotoPopUp,
      navigationOptions: {
        title: 'Instellingen',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F2F3F7',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        textAlign: 'center',
        fontSize: 22,
        flex: 1,
      },
      tabBarStyle: {
        padding: 20,
      },
      headerTintColor: '#31455E',
      headerForceInset: {top: 'never', bottom: 'never'},
    },
  },
);

const PresenceStack = createStackNavigator(
  {
    Presence: {
      screen: Presence,
      navigationOptions: {
        title: 'Mijn aanwezigheid',
      },
    },
    PresenceCalendar: {
      screen: PresenceCalendar,
      navigationOptions: {
        title: 'Aanwezigheid',
        headerRight: () => <View style={{alignSelf: 'flex-end'}} />,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F2F3F7',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
        flex: 1,
      },
      tabBarStyle: {
        padding: 20,
      },
      headerTintColor: '#31455E',
      headerForceInset: {top: 'never', bottom: 'never'},
    },
  },
);

const AppTabNavigator = createBottomTabNavigator(
 
  {
    Home: {
      screen: RootStack,
      navigationOptions: () => ({
        title: 'Dashboard',
        tabBarIcon: ({focused, tintColor}) =>
          focused ? (
            <Image
              style={{tintColor: global.brandColor, padding: 15, margin: 10}}
              source={require('./../assets/images/common/home001-E031-active.png')}
            />
          ) : (
            <Image
              style={{padding: 15, margin: 10}}
              source={require('./../assets/images/common/home001-E031.png')}
            />
          ),
      }),
      tabBarOptions: {
        activeTintColor: global.brandColor,
      },
    },
    Aanwezigheid: {
      screen: PresenceStack,
      navigationOptions: () => ({
        title: 'Aanwezigheid',
        tabBarIcon: ({focused, tintColor}) =>
          focused ? (
            <Image
              style={{tintColor: global.brandColor, padding: 15, margin: 10}}
              source={require('./../assets/images/common/edit001-E069-active.png')}
            />
          ) : (
            <Image
              style={{padding: 15, margin: 10}}
              source={require('./../assets/images/common/edit001-E069.png')}
            />
          ),
      }),
      tabBarOptions: {
        activeTintColor: global.brandColor,
        labelStyle: {color: '#0f0'},
      },
    },
    berichten: {
      screen: MessageStack,
      navigationOptions: ({screenProps} ) => ({
        screenProps:screenProps,
        title: 'berichten',
        tabBarIcon: ({focused, tintColor}) =>
        <View>
        {screenProps.length!==0  ?<IconBadge
        MainElement={ <Image
          style={{padding: 15, margin: 10,color:{tintColor}}}
          source={require('./../assets/images/common/mail001-E02D.png')}
        /> }
        BadgeElement={<Text style={{ color: 'white' }}>{screenProps.length }</Text>}
      />:
      <Image
         style={{tintColor: global.brandColor}}
              source={require('./../assets/images/common/mail001-E02D.png')}
            />
      }
         
        </View>
        
      }),
      tabBarOptions: {
        activeTintColor: global.brandColor,
      
        labelStyle: {color: '#0f0'},
        recivealert:"red",
      },
    },
    profiel: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarLabel: 'profiel',
        tabBarIcon: ({focused, tintColor}) =>
          focused ? (
            <Image
              style={{tintColor: global.brandColor, padding: 15, margin: 10}}
              source={require('./../assets/images/common/user023-E183-active.png')}
            />
          ) : (
            <Image
              style={{padding: 15, margin: 10}}
              source={require('./../assets/images/common/user023-E183.png')}
            />
          ),
      }),
      tabBarOptions: {
        activeTintColor: global.brandColor,
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        height: 70,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderTopColor: 'transparent',
      },
    
      activeTintColor: '#5467FD',
      inactiveTintColor: '#31455E',
      recivealert:"red",
    },
  },
  (RootStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName;

    if (routeName === 'SignIn') {
      tabBarVisible = false;
    }

    if (routeName === 'SplashScreen') {
      tabBarVisible = false;
    }

    return {
      tabBarVisible,
    };
  }),
);

const mapStateToProps = state => {
  console.warn(state,"stateaaaaaaaaaaaaaaaaaaaaaaaa")
  
 
 return { loadBasicList: state.api.loadBasic,
         notification:state.notification}
};


const mapDispatchToProps= {
}
const AppNavigator = createAppContainer(AppTabNavigator);
export default  connect(mapStateToProps,mapDispatchToProps)(AppNavigator);


