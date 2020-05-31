/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image,AsyncStorage,Alert,TouchableHighlight,Modal,StyleSheet, Dimensions,ScrollView, PanResponder, Animated} from 'react-native';
  import Draggable from "./Dragable";
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect, connectAdvanced} from 'react-redux';
import COLORS from '../styles/variables';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import firebase from '@react-native-firebase/app'
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
      DynamicItemDIS:width*0.65,
      blueBoxHeight:width,
      dashboardItems:[{index:0,imageName:attendance_Img,ImageText:"Taking Attendance"},{index:1,imageName:messages_Img,ImageText:"Lees berichten"},
      {index:2,imageName:setting_Img,ImageText:"Settings?"},{index:3,imageName:help_Img,ImageText:"Help"},{index:4,imageName:anything_Img,ImageText:"Nog iets?"},  
    ]
    }
  }

async componentDidMount() {
  this.setState({conut:this.state.dashboardItems})
  var data= await AsyncStorage.getItem('@notification')
    // console.warn("NOTIFICATION in local storage!!!!!!!!!!!!!",data)
     await  this.getGroupList() 
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
this.changebuleboxSize()
}
  changebuleboxSize=(pan,index)=>{
    //  console.warn("******count items in drag items*****",index)
  // this.pressDragItems()
// var dataSelected= this.state.dashboardItems.filter(obj=>{obj.index!==index})

var data=this.state.conut.filter(obj=>obj.index!==index)
var selectedItems= this.state.conut.filter(obj=>obj.index===index)
this.setState({selected:[...this.state.selected,...selectedItems]})
// this.state.selected.push({selectedItems})
// this.setState({selected:this.state.selected})
this.setState({conut:data})
//  console.warn("++++++Dataselected filter++++++++++",this.state.conut)
if(this.state.conut.length<=2){
  this.setState({addItem:this.state.addItem+1})
  if(this.state.addItem===1){
    this.setState({DynamicItemDIS:width*0.300})
  //  this.addItems()
  }
  this.setState({blueBoxHeight:width*0.68})
}
if(this.state.conut.length===0){
  this.setState({DynamicItemDIS:width*0.0020})
  this.setState({blueBoxHeight:width*0.35})
}

  }


  pressDragItems=(index)=>{
//     console.warn("ggggggggggggggggggggggggggggggggg",index)
//     if(index>=2){
//     this.setState({blueBoxHeight:width*0.55})
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

addItems=()=>{
  // sthis.setState({counter:{...this.state.counter,...1}})
  var joined = this.state.counter.concat('1');
  this.setState({counter:joined})

}

setDropZoneValues(event){
  // console.warn("@@@@@@@@@@",event.nativeEvent.layout)
  this.setState({
      dropZoneValues : event.nativeEvent.layout
  });
}

  render() {
     console.warn("selected items in dashboard#############",this.state.selected)
    let data= this.props.notification.length!==0 && this.props.notification[0].notification.body.toString()
   
    return (
      <ScrollView>
      <View style={{paddingRight:10,paddingLeft:10}}>
      {this.state.showitems===false &&  <View style={{alignItems:"center",marginTop:30}}>
                  <Text style={{fontSize:25}}>Dit is uw dashboard.</Text>
                  <Text style={{fontSize:25}}>Wat Will u zein?</Text>
                  <Text style={{marginTop:30,marginBottom:50}}>Voeg hieronder maximaal tot 5  snelkoppelingen toe</Text>
              </View>}
            {this.state.showitems===true &&
           <View  style={{backgroundColor:"#5467fd",borderRadius:10,padding:5,flexDirection:"row",flexWrap:"wrap",alignItems:"center",height:this.state.blueBoxHeight}}>
             {this.state.dashboardItems.map((items,index)=>{
             
               return(
                <View style={cs.pairBoxarray}  key={index} > 
                 <TouchableOpacity  onPress={()=>this.addItems()} style={{position:"absolute",top:25,left:0,zIndex:2,width:25,height:25,borderRadius:22,backgroundColor:"white",alignItems:"center",justifyContent:"center",padding:3}}>
                                <Icon
                                  name="plus"
                                  color="#5467fd"
                                  size={17}
                                  //  style={{zIndex:2 }}    
                                />                 
                 </TouchableOpacity>   
                 <View style={{   borderRadius: 10,
    backgroundColor: '#fff',
    height: height * 0.16,
    width: '100%',
    flex: 1,
    margin: 10,
    // marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    zIndex:-1}}>
                    <Image style={[cs.boxPairImageStyle,{zIndex:-1}]} source={items.imageName} />
                    <Text style={cs.pairBoxFont}>{items.ImageText}</Text> 
                            {/* <Draggable image={items.imageName}  index={index} changebuleboxSize={this.changebuleboxSize}  imagetext={items.ImageText}/> */}
                
                </View>
               </View>
               )
             })} 
                  <View style={[cs.borderTeachertop,{position:"absolute",top:this.state.DynamicItemDIS,width:width*0.385,left:width*0.45}]}>
                      <View Style={{alignItems:"center"}}>
                          <Text style={{color:"white",alignSelf:"center",marginLeft:30}}>Sleep de snelkoppelingen hierheen</Text>
                      </View>
                  </View>
            
           </View>
         }
       { this.state.showitems===false &&  <TouchableOpacity  onPress={()=>this.setState({showitems:true})} style={{justifyContent:"center",alignItems:'center',height:"17%",backgroundColor:"#5467fd",width:'20%',alignSelf:"center",borderRadius:15}}>
           <View style={{backgroundColor:"#5467fd",alignItems:"center",justifyContent:"center",flex:this.state.blueBoxFlex}}>
           <Icon
              name="plus"
              color="white"
              size={30}
              style={{marginLeft: 5, marginTop: 5}}
            />
           </View>
       </TouchableOpacity>}
       
            <View style={{flexDirection:"row",flexWrap:"wrap"}}>
              
                    {/* {this.state.counter.map(data=> {
                      return ( */}
                        <View>
                          <TouchableOpacity   onPress={()=>this.addItems()} style={{  position:"relative", margin:0, padding:0,top:60 }}>
                                <Icon
                                  name="plus"
                                  color="#5467fd"
                                  size={17}
                                  
                                />
                                
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={()=>this.addItems()} style={{  position:"relative", margin:0, padding:0,top:70,left:3 ,borderRadius:10,backgroundColor:"red",width:15,height:15,alignItems:"center"}}>
                                <Icon
                                  name="minus"
                                  color="white"
                                  size={17}
                                  
                                />
                                
                            </TouchableOpacity>
                 
                              <View style={[cs.borderTeacher,{width:width*0.40}]}>
                              </View>  
                             
                        </View>
                        {/* )
                  })} */}
             </View>    
           <TouchableOpacity style={[cs.buttondashbordStyle,{marginTop:20}]} onPress={()=> this.props.navigation.navigate('DashboardTeacher',{selected:this.state.selected})}>
               <Text style={{color:"white"}}>Select Youre Dashboard Type</Text>
           </TouchableOpacity>
      </View>
      </ScrollView>
      
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
