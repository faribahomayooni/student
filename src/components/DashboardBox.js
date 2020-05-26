/* eslint-disable react-native/no-inline-styles */
import React, {Component,useState,useEffect} from 'react';
import {Text, View, TouchableOpacity, Image,AsyncStorage,Alert,TouchableHighlight,Modal,StyleSheet, Dimensions,ScrollView} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import { StackActions, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import COLORS from '../styles/variables';
import { bindActionCreators } from 'redux';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';

const {width,height}=Dimensions.get("window")
class DashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalVisible:false
    }
  }

async componentDidMount() {
  var data= await AsyncStorage.getItem('@notification')
    console.warn("NOTIFICATION in local storage!!!!!!!!!!!!!",data)
    //  console.warn("test navigation action",NavigationActions)
     await  this.getGroupList()
  // console.warn("************************fariba",this.props.loadBasicList)
     this.props.notification.length!==0 && this.setState({modalVisible:true})  
      this.checkPermission();
      const {dispatch} = this.props;
      this.SaveTokenwithapi()
      const unsubscribe = messaging().onMessage(async remoteMessage => {
      this.setState({modalVisible:true})
      this.props.getnotification(remoteMessage)
      
     });
        messaging().setBackgroundMessageHandler(async remoteMessage => {   
        this.props.getnotification(remoteMessage)
        this.setState({modalVisible:true})
        ;
      });  
  }


  getGroupList=async()=>{
    axios
      .post(
        global.url + 'api/admin/loadBasicList',
        {
          id:30,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        if (res.data.msg === 'success') {
          // console.warn("%%%%%data for get group",res.data)
          this.props.getGroupStudent(res.data)
          // console.warn(res.data)
       
        }
      })
      .catch(error => {
        console.log(error);
      }); 
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
    // console.warn("@@@@@@@@@@@@@@@@@",fcmToken)
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
        // console.log('permission rejected');
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
    // console.warn("tokenfcm",res.data)
    if (res.data.msg === 'success') {
      messaging().onNotificationOpenedApp(remoteMessage => {
        alert(remoteMessage.notification)
        // console.warn(
        //   'Notification caused app to open from background state:',
        //   remoteMessage.notification,
        // );
      });
      
    }
  })
  .catch(error => {
    // console.warn("####3333333333333",error);
  });
}

  render() {
     console.warn("99999999999999999999999999999999999student",NavigationActions)
    let data= this.props.notification.length!==0 && this.props.notification[0].notification.body.toString()
    let attendance_Img = require('./../assets/images/student/dashboard/Image217.png');
    let messages_Img = require('./../assets/images/student/dashboard/Image218.png');
    let help_Img = require('./../assets/images/student/dashboard/Image220.png');
    let anything_Img = require('./../assets/images/student/dashboard/Image221.png');
    let travel_Img = require('./../assets/images/student/dashboard/Image222.png');
    const {loadBasicList} = this.props;
    return (
      <View style={{padding: 20}}>
       
   
         <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
      >
        <ScrollView>
       { this.props.notification.length!==0 && <View style={styles.centeredView}>       
          <View style={styles.modalView}>
         {this.props.notification[0].data.image!==undefined && <Image   style={styles.messageProfile} source={{uri:global.url+`/app/setting/notify/nt-${this.props.notification[0].data.image}`}}/>}
            <Text style={styles.modalTitleText}>{this.props.notification.length!==0 && this.props.notification[0].notification.title}</Text>
            <Text style={styles.modalText}>{this.props.notification.length!==0 &&data.slice(4,150) }</Text>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                this.props.navigation.navigate('Messages')
                this.setState({modalVisible:!(this.state.modalVisible)});
              }}
            >
              <Text style={styles.textStyle}>Show Message</Text>
            </TouchableHighlight>
          </View>
        </View>}
        </ScrollView>
      </Modal>
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
                basicListData: this.props.GroupStudent,
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
  // console.warn(state,"stateaaaaaaaaaaaaaaaaaaaaaaaa")
  
 
 return { loadBasicList: state.api.loadBasic,
         notification:state.notification,
         GroupStudent:state.GroupStudent
        }
};


const mapDispatchToProps= {
 getnotification,
 getGroupStudent
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop:height/3,
    // flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  justifyContent:"center"
,    // width:200,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
     padding:35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width:0,
        height: 2,
    
    },
   
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
   
  },
  modalView: {
    // margin: 20,
    // borderRadius: 20,
    //  paddingRight:10,
    //  paddingLeft:10,
    //  paddingBottom:30,
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width:0,
    //   height: 2,
    
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5
  },
  openButton: {
    marginTop:10,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  messageProfile:{
    width:width/2,
    height:width/5,
    resizeMode:"contain"
  },
  modalTitleText:{
   fontWeight:"bold",
  //  color:"white",
   textAlign: "center",
   fontSize:18,
   marginTop:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center",
    // color:"white",
    fontSize:18
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardBox);
