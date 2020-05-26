/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image,AsyncStorage,Alert,TouchableHighlight,Modal,StyleSheet, Dimensions,ScrollView} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import COLORS from '../styles/variables';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';

const {width,height}=Dimensions.get("window")
class DashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalVisible:false,
      showitems:false,
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
    let data= this.props.notification.length!==0 && this.props.notification[0].notification.body.toString()
    let attendance_Img = require('./../assets/images/student/dashboard/Image217.png');
    let messages_Img = require('./../assets/images/student/dashboard/Image218.png');
    let help_Img = require('./../assets/images/student/dashboard/Image220.png');
    let anything_Img = require('./../assets/images/student/dashboard/Image221.png');
    let travel_Img = require('./../assets/images/student/dashboard/Image222.png');
   
    return (
      <View  style={{padding:10}}>
      {this.state.showitems===false &&  <View style={{alignItems:"center",marginTop:30}}>
            <Text style={{fontSize:25}}>Dit is uw dashboard.</Text>
            <Text style={{fontSize:25}}>Wat Will u zein?</Text>
            <Text style={{marginTop:30,marginBottom:50}}>Voeg hieronder maximaal tot 5  snelkoppelingen toe</Text>
         </View>}
         {this.state.showitems===true &&
         <View style={{backgroundColor:"#5467fd",borderRadius:10,padding:20}}>
           
           {/* <TouchableOpacity
           onPress={() => {
   
             this.props.navigation.navigate('Presence');
           }}
           style={cs.boxesWrapper}>
           <Image style={cs.boxImageStyle} source={attendance_Img} />
           <Text style={cs.attendanceFont}>Taking Attendance</Text>
         </TouchableOpacity> */}
         <View style={cs.pairBox}>
             
           <TouchableOpacity
           onPress={() => {
   
             this.props.navigation.navigate('Presence');
           }}
           style={cs.boxesPairWrapper}>
           <Image style={cs.boxPairImageStyle} source={attendance_Img} />
           <Text style={cs.pairBoxFont}>Taking Attendance</Text>
         </TouchableOpacity>
           <TouchableOpacity
             onPress={() => {
               this.props.navigation.navigate('Messages');
             }}
             style={cs.boxesPairWrapper}>
             <Image style={cs.boxPairImageStyle} source={messages_Img} />
             <Text style={cs.pairBoxFont}>Lees berichten</Text>
           </TouchableOpacity>
           {/* <TouchableOpacity
             onPress={() => {
               this.props.navigation.navigate('HelpCentre');
             }}
             style={cs.boxesPairWrapper}>
             <Image style={cs.boxPairImageStyle} source={help_Img} />
             <Text style={cs.pairBoxFont}>Help</Text>
           </TouchableOpacity> */}
         </View>
         <View style={cs.pairBox}>
         <TouchableOpacity style={cs.boxesPairWrapper}>
             {/* <Image style={cs.boxPairImageStyle} source={anything_Img} /> */}
             <Text style={cs.pairBoxFont}>Settings?</Text>
           </TouchableOpacity>
           {/* <TouchableOpacity style={cs.boxesPairWrapper}>
             <Image style={cs.boxPairImageStyle} source={anything_Img} />
             <Text style={cs.pairBoxFont}>Nog iets?</Text>
           </TouchableOpacity> */}
             <TouchableOpacity
             onPress={() => {
               this.props.navigation.navigate('HelpCentre');
             }}
             style={cs.boxesPairWrapper}>
             <Image style={cs.boxPairImageStyle} source={help_Img} />
             <Text style={cs.pairBoxFont}>Help</Text>
           </TouchableOpacity>
           {/* <TouchableOpacity
             onPress={() => {
               this.props.navigation.navigate('TravelsCostSetting', {
                 basicListData: this.props.GroupStudent,
               });
             }}
             style={cs.boxesPairWrapper}>
             <Image style={cs.boxPairImageStyle} source={travel_Img} />
             <Text style={cs.pairBoxFont}>Reiskosten</Text>
           </TouchableOpacity> */}
           </View>
           <View style={cs.pairBox}>
           <TouchableOpacity style={cs.boxesPairWrapper}>
             <Image style={cs.boxPairImageStyle} source={anything_Img} />
             <Text style={cs.pairBoxFont}>Nog iets?</Text>
           </TouchableOpacity> 
             <TouchableOpacity style={cs.borderTeachertop}>
                 <Text style={{color:"white",alignItems:"center",marginLeft:"25%"}}>Sleep de 
                          snelkoppelingen 
                            hierheen</Text>
              </TouchableOpacity>
             
       
           {/* <TouchableOpacity
             onPress={() => {
               this.props.navigation.navigate('TravelsCostSetting', {
                 basicListData: this.props.GroupStudent,
               });
             }}
             style={cs.boxesPairWrapper}>
             
             <Text style={cs.pairBoxFont}>Reiskosten</Text>
           </TouchableOpacity> */}
           </View>
           </View>
         }
       { this.state.showitems===false &&  <TouchableOpacity  onPress={()=>this.setState({showitems:true})} style={{justifyContent:"center",alignItems:'center',height:"17%",backgroundColor:"#5467fd",width:'20%',alignSelf:"center",borderRadius:15}}>
           <View style={{backgroundColor:"#5467fd",alignItems:"center",justifyContent:"center"}}>
           <Icon
              name="plus"
              color="white"
              size={30}
              style={{marginLeft: 5, marginTop: 5}}
            />
           </View>
       </TouchableOpacity>}
       <Icon
              name="plus"
              color="#5467fd"
              size={17}
              style={{marginLeft: 5, marginTop: 5,position:"absolute",top:"89%",left:"95%"}}
            />
              <Icon
              name="plus"
              color="#5467fd"
              size={17}
              style={{marginLeft: 5, marginTop: 5,position:"absolute",top:"90%",right:"51%"}}
            />
        <View style={cs.pairBoxTeacher}>
              <TouchableOpacity style={cs.borderTeacher}>
           
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                 
                }}
                style={cs.borderTeacher}>
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
