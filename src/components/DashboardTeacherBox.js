/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image,AsyncStorage,Alert,TouchableHighlight,Modal,StyleSheet, Dimensions,ScrollView, PanResponder, Animated} from 'react-native';
  import Draggable from "./Dragable";
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import Icon from 'react-native-vector-icons/FontAwesome';
import {TypeSignIn} from '../actions/ProfileAction'
import {connect, connectAdvanced} from 'react-redux';
import COLORS from '../styles/variables';
import { bindActionCreators } from 'redux';
import axios from 'axios';
// import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';

const {width,height}=Dimensions.get("window")

    let attendance_Img = require('./../assets/images/student/dashboard/Image217.png');
    let messages_Img = require('./../assets/images/student/dashboard/Image218.png');
    let help_Img = require('./../assets/images/student/dashboard/Image220.png');
    let anything_Img = require('./../assets/images/student/dashboard/Image221.png');
    let setting_Img = require('./../assets/images/student/dashboard/Setting.png');
class DashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedItems:[],
      addItem:0,
      modalVisible:false,
      showitems:false,
      counter:[1],
      conut:5,
      selected:[],
      popItems:[],
      DynamicItemDIS:width*0.65,
      blueBoxHeight:width,
      dashboardItems:[{index:0,imageName:attendance_Img,ImageText:"Taking Attendance"},{index:1,imageName:messages_Img,ImageText:"Lees berichten"},
      {index:2,imageName:setting_Img,ImageText:"Settings?"},{index:3,imageName:help_Img,ImageText:"Help"},{index:4,imageName:anything_Img,ImageText:"Nog iets?"},  
    ]
    }
  }

async componentDidMount() {
  this.setState({popItems:[]})
  this.setState({selectedItems:this.props.navigation.state.params.select})
  this.state.dashboardItems.filter(obj=>{
    if (!this.props.navigation.state.params.select.some(o => o.index === obj.index)) {
      this.state.popItems.push({ ...obj })
    }
   })
   this.setState({dashboardItems:this.state.popItems})
  this.props.TypeSignIn(await AsyncStorage.getItem('@typeofsignin'))
  this.setState({conut:this.state.dashboardItems})
  var data= await AsyncStorage.getItem('@notification')
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


  componentWillReceiveProps(){

    // this.state.dashboardItems.filter(obj=>this.props.navigation.state.param.select.filter(item=>{(item.index==obj.index)&& this.state.selectedItems.push(item)}))
 
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
  

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
           
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await messaging().requestPermission();

        this.getToken();
    } catch (error) {
       
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
    if (res.data.msg === 'success') {
      messaging().onNotificationOpenedApp(remoteMessage => {
        alert(remoteMessage.notification)
       
      });
      
    }
  })
  .catch(error => {
  });
}

addItems=(items)=>{
 
var selected= this.state.dashboardItems.filter(obj=>obj!==items)

this.setState({dashboardItems:selected})
//  this.setState({selectedItems:items})
//  this.state.selectedItems.Concat(items)
 this.setState({selectedItems:[items,...this.state.selectedItems]})
}

minusItems=(items)=>{

  var selected= this.state.selectedItems.filter(obj=>obj!==items)
   this.setState({selectedItems:selected})
   this.setState({dashboardItems:[items,...this.state.dashboardItems]})

}

setDropZoneValues(event){
  // console.warn("@@@@@@@@@@",event.nativeEvent.layout)
  this.setState({
      dropZoneValues : event.nativeEvent.layout
  });
}

  render() {
  
    let data= this.props.notification.length!==0 && this.props.notification[0].notification.body.toString()
   
    return (
      <View>
      <ScrollView>
      <View style={{paddingRight:10,paddingLeft:10}}>
      {this.state.showitems===false &&  <View style={{alignItems:"center",marginTop:30}}>
                  <Text style={{fontSize:25}}>Dit is uw dashboard.</Text>
                  <Text style={{fontSize:25}}>Wat Will u zein?</Text>
                  <Text style={{marginTop:30,marginBottom:50}}>Voeg hieronder maximaal tot 5  snelkoppelingen toe</Text>
              </View>}
            {this.state.showitems===true &&
           <View  style={{backgroundColor:"#5467fd",borderRadius:10,padding:5,flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
             {this.state.dashboardItems.length!==undefined  && this.state.dashboardItems.map((items,index)=>{
             
               return(
                <View style={cs.pairBoxarray}  key={index} > 
                 <TouchableOpacity  onPress={()=>this.addItems(items)} style={{position:"absolute",top:25,left:0,zIndex:2,width:25,height:25,borderRadius:22,backgroundColor:"white",alignItems:"center",justifyContent:"center",padding:3}}>
                                <Icon
                                  name="plus"
                                  color="#5467fd"
                                  size={17}
                                  //  style={{zIndex:2 }}    
                                />                 
                 </TouchableOpacity>   
                 <View style={cs.ShowBox}>
                    <Image style={[cs.boxPairImageStyle,{zIndex:-1}]} source={items.imageName} />
                    <Text style={cs.pairBoxFont}>{items.ImageText}</Text> 
                            {/* <Draggable image={items.imageName}  index={index} changebuleboxSize={this.changebuleboxSize}  imagetext={items.ImageText}/> */}
                
                </View>
               </View>
               )
             })} 
                  <View style={[cs.borderTeachertop,]}>
                      <View Style={{alignItems:"center"}}>
                          <Text style={{color:"white",alignSelf:"center",marginLeft:30}}>Sleep de snelkoppelingen hierheen</Text>
                      </View>
                  </View>
            
           </View>
         }
       { this.state.showitems===false &&  <TouchableOpacity  onPress={()=>this.setState({showitems:true})} style={{justifyContent:"center",alignItems:'center',height:"20%",backgroundColor:"#5467fd",width:'20%',alignSelf:"center",borderRadius:10,padding:20}}>
       <View style={{alignSelf:"center",justifyContent:"center"}}>
           <Icon
              name="plus"
              color="white"
              size={30}
              style={{}}
            />
           </View>
       </TouchableOpacity>}
       
        {this.state.showitems &&   <View style={{flexDirection:"row",flexWrap:"wrap",marginBottom:width*0.15,justifyContent:"center"}}>
              
                    {this.state.selectedItems.map(items=> {
                      return (
                        <View>
                        
                            <TouchableOpacity   onPress={()=>this.minusItems(items)} style={{zIndex:3 ,  position:"relative", margin:0, padding:0,top:40,left:3 ,borderRadius:10,backgroundColor:"red",width:15,height:15,alignItems:"center"}}>
                                <Icon
                                  name="minus"
                                  color="white"
                                  size={17}
                                  
                                />
                                
                            </TouchableOpacity>
                 
                              <View style={[cs.borderTeacher,{width:width*0.40}]}>
                                   <Image style={[cs.boxPairImageStyle,{zIndex:-1}]} source={items.imageName} />
                                   <Text style={cs.pairBoxFont}>{items.ImageText}</Text> 
                              </View>  
                             
                        </View>
                        )
                  })} 
             </View>    }
           
      </View>
      
      {this.state.showitems===false &&
           <View style={[cs.pairBox],{marginBottom:width/10,flexDirection:"row"}}>
              <View
                style={[cs.borderTeacher,{width:width*0.40}]}>
              </View>
              <View
                style={[cs.borderTeacher,{width:width*0.40}]}>
              </View>
         </View>

              }
    {this.state.showitems && <TouchableOpacity style={[cs.buttondashbordStyle,{marginBottom:width*0.05,alignSelf:"center",width:width*0.95,borderRadius:5,padding:10}]} onPress={()=> this.props.navigation.navigate('DashboardTeacher',{selected:this.state.selectedItems,layout:this.props.navigation.state.params.status})}>
                               <Text style={{color:"white"}}>Select Youre Dashboard Type</Text>
                            </TouchableOpacity>}
                            </ScrollView>
        </View>
    
    );
  }
}

const mapStateToProps = state => {
  
 
 return { loadBasicList: state.api.loadBasic,
         notification:state.notification,
         GroupStudent:state.GroupStudent
        }
};


const mapDispatchToProps= {
 getnotification,
 getGroupStudent,
 TypeSignIn
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
  
    fontSize:18
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardBox);



// import React, { Component } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import Draggable from "./Dragable";

// export default class Screen extends Component {
//   render() {
//     return (
//       <View style={styles.mainContainer}>
//         <View style={styles.dropZone}>
//           <Text style={styles.text}>Drop them here!</Text>
//         </View>
//         <View style={styles.ballContainer} />
//         <View style={styles.row}>
//           <Draggable />
//           <Draggable />
//           <Draggable />
//           <Draggable />
//           <Draggable />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1
//   },
//   ballContainer: {
//     height:200
//   },
//   row: {
//     flexDirection: "row"
//   },  
//   dropZone: {
//     height: 200,
//     backgroundColor: "#00334d"
//   },
//   text: {
//     marginTop: 25,
//     marginLeft: 5,
//     marginRight: 5,
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "bold"
//   }
// });
