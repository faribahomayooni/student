/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View,StyleSheet, Dimensions,ScrollView,TouchableOpacity,Image,AsyncStorage,ToastAndroid, ActivityIndicator} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import {connect} from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';import { floor } from 'react-native-reanimated';
;

const {width,height}=Dimensions.get("window")
let attendance_Img = require('../assets/images/student/dashboard/Image217.png');
let messages_Img = require('../assets/images/student/dashboard/Image218.png');
let help_Img = require('../assets/images/student/dashboard/Image220.png');
let anything_Img = require('../assets/images/student/dashboard/Image221.png');
let setting_Img = require('../assets/images/student/dashboard/Setting.png');
class DashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state={
        typeTemplate:"Transfrom",
        dashboardStatus:[],
        showHome:true,
        Items:[],
        count:0,
        edit:false,
        data:[],
        item:"",
        arr:[{PageName:"Presence",Text:"Taking Attendance"},{PageName:"Messages",Text:"Lees berichten"},{PageName:"HelpCentre",Text:"Help"},{PageName:"TravelsCostSetting",Text:"Reiskosten"}],
        selectedItems:[],
        dashboardItems:[{index:0,imageName:attendance_Img,ImageText:"Taking Attendance"},{index:1,imageName:messages_Img,ImageText:"Lees berichten"},
      {index:2,imageName:setting_Img,ImageText:"Settings?"},{index:3,imageName:help_Img,ImageText:"Help"},{index:4,imageName:anything_Img,ImageText:"Nog iets?"},  
    ]
    }
  }

  loadDashboard = async () => {
    // this.setState({selectedItems:[]})
    axios
      .get(global.url + 'api/teacher/loadDashboard', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(async(res) => {
        console.warn("=====>res in load Dashboard",res.data)
      
        if (res.data.msg === 'success') {
          this.setState({dashboardStatus:res.data.data})
        
          var data =  res.data.data[0].FldDashbord
         var items = JSON.parse(data)
         items.filter(obj=>this.state.dashboardItems.filter(i=>{(i.index===obj) && this.state.data.push(i)}))
         this.state.data.filter(obj=>{
          if (!this.state.selectedItems.some(o => o.index === obj.index)) {
            this.state.selectedItems.push({ ...obj })
          }
         })
       
         this.setState({showHome:false})
       }
        if (res.data.msg === 'fail') {
          
          return;
        }
      })
      .catch(error => {
        console.warn('error', error);
      });
  };

 componentDidMount() {
  console.warn("sadasdgashd")
  this.setState({selectedItems:[]})
  if(this.state.edit===false){
       this.loadDashboard()}
    //  if( this.state.dashboardStatus.length!==0){
    //  var data =  this.state.dashboardStatus[0].FldDashbord
    //  var items = JSON.parse(data)
    //  items.filter(obj=>this.state.dashboardItems.filter(i=>{(i.index===obj) && this.state.selectedItems.push(i)}))} 
    }
  
   componentWillReceiveProps(next){
    // this.setState({selectedItems:[]})
    this.setState({data:this.state.selectedItems})
  if (this.state.edit===true && next.navigation.state.params!==undefined  && next.navigation.state.params.resetSelected==='choosedDashboard'){
   this.setState({selectedItems:[]})
   this.loadDashboard()
   this.setState({count:this.state.count+1}) 
  }
  }
  componentWillUnmount(){
    this.setState({count:0})
    this.setState({selectedItems:[]})
  }
editPress=()=>{
  this.setState({edit:true})
  this.props.navigation.navigate('DashboardTeacherBox',{select:this.state.selectedItems,staus:this.state.dashboardStatus[0].FldLayout});
}

onpressItems=async(select)=>{
 await this.setState({item:""})
  this.state.arr.filter(obj=>{(obj.Text===select.ImageText) && this.setState({item:obj.PageName})}),
  console.warn("=====>this is item for navigate",this.state.item)
  this.props.navigation.navigate(this.state.item)

}


  render() {
    console.warn("selected items",this.state.selectedItems.length)
      const{status}=this.props
      const {dashboardStatus}=this.state
    return (
      <View style={{alignItems:"center",padding:10}}>  
        <ScrollView>
         {this.state.showHome === true? 
          <View style={{alignItems:"center",justifyContent:"center",marginTop:width/2}}>
             <ActivityIndicator/>
             <Text>wacht alsjeblieft</Text>
          </View>
         :
          
              <View style={{justifyContent:"space-around",marginTop:10,}}>
                  <TouchableOpacity onPress={()=>this.editPress()}>
                      <Icon name="edit" size={25} color={"blue"}/>
                  </TouchableOpacity>
                          {dashboardStatus.length!==0 && dashboardStatus[0].FldLayout===1 && <View style={{marginTop:width/5}} >
                              
                                <View style={[cs.pairBox]}>
                                        <TouchableOpacity
                                         onPress={()=>this.onpressItems(this.state.selectedItems[0])}
                                          style={[cs.boxesWrapper,{width:width*0.70}]}>
                                            <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].ImageText}</Text>
                                         </TouchableOpacity>
                                </View>
                                    <View  style={[cs.pairBox,{marginTop:10}]}>
                                    <TouchableOpacity
                                     onPress={()=>this.onpressItems(this.state.selectedItems[1])}
                                        style={[cs.boxesWrapper,{width:width*0.70}]}>
                                          <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].ImageText}</Text>
                                      </TouchableOpacity>
                                    </View> 
                            </View> }
                     {dashboardStatus.length!==0 && dashboardStatus[0].FldLayout===2 &&  <View  style={{marginBottom:width*0.15}}>          
                           <View style={[cs.pairBox]}>
                               {console.warn(this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].imageName)}
                                  <TouchableOpacity
                                   onPress={()=>this.onpressItems(this.state.selectedItems[0])}
                                   style={[cs.boxesWrapperthree]}>
                                          <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].imageName} />
                                           <Text style={cs.pairBoxFont}>{this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].ImageText}</Text>
                                  </TouchableOpacity>
                           </View>
                               <View style={[cs.pairBox]}>
                               <TouchableOpacity
                                onPress={()=>this.onpressItems(this.state.selectedItems[1])}  
                                style={[cs.boxesWrapperthree]}>
                                     <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].imageName} />
                                           <Text style={cs.pairBoxFont}>{this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].ImageText}</Text>
                                 </TouchableOpacity>
                               </View> 
                               <View style={[cs.pairBox]}>
                                  <TouchableOpacity
                                   onPress={()=>this.onpressItems(this.state.selectedItems[2])}
                                   style={[cs.boxesWrapperthree]}>
                                     <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[2]!==undefined && this.state.selectedItems[2].imageName}/>
                                           <Text style={cs.pairBoxFont}>{this.state.selectedItems[2]!==undefined && this.state.selectedItems[2].ImageText}</Text>
                                    </TouchableOpacity>
                               </View> 
                       </View> }
                    
                  <View>
                
                   {dashboardStatus.length!==0 && dashboardStatus[0].FldLayout===3 &&
                   <View >
                   
                       <TouchableOpacity style={cs.boxesWrapper} onPress={()=>this.onpressItems(this.state.selectedItems[0])}>
                                  <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].imageName} />
                                   <Text style={cs.pairBoxFont}>{this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].ImageText}</Text>
                       </TouchableOpacity>
                         <View style={[cs.pairBox,{width:width*0.80}]}>
                               <TouchableOpacity
                                onPress={()=>this.onpressItems(this.state.selectedItems[1])}
                                style={[cs.boxesPairWrapper,{width:width*0.20}]}>
                                  <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].ImageText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>this.onpressItems(this.state.selectedItems[2])}
                                style={cs.boxesPairWrapper}>
                                      <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[2]!==undefined && this.state.selectedItems[2].imageName} />
                                      <Text style={cs.pairBoxFont}>{this.state.selectedItems[2]!==undefined && this.state.selectedItems[2].ImageText}</Text>
                               </TouchableOpacity>
                          </View>
                            <View style={cs.pairBox}>
                              <TouchableOpacity style={cs.boxesPairWrapper}  onPress={()=>this.onpressItems(this.state.selectedItems[3])}>
                                        <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[3]!==undefined && this.state.selectedItems[3].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[3]!==undefined && this.state.selectedItems[3].ImageText}</Text>
                              </TouchableOpacity>
                              {this.state.selectedItems.length>4 && <TouchableOpacity
                                onPress={()=>this.onpressItems(this.state.selectedItems[4])}
                                style={cs.boxesPairWrapper}>
                                  <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[4]!==undefined && this.state.selectedItems[4].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[4]!==undefined && this.state.selectedItems[4].ImageText}</Text>
                                </TouchableOpacity>}
                            </View> 
                      </View> }
                
                     {dashboardStatus.length!==0 && dashboardStatus[0].FldLayout===4  &&
                     <View >
                      
                         <View style={[cs.pairBox,{width:width*0.80}]}>
                               <TouchableOpacity
                                onPress={()=>this.onpressItems(this.state.selectedItems[0])}
                                style={[cs.boxesPairWrapper,{  transform: [
                               
                                   { rotateZ: "-20deg" }
                                  ]}]}>
                                            <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[0]!==undefined && this.state.selectedItems[0].ImageText}</Text>
                                 </TouchableOpacity>
                             <TouchableOpacity
                              onPress={()=>this.onpressItems(this.state.selectedItems[1])}
                               style={[cs.boxesPairWrapper,{  transform: [
                             
                               { rotateZ: "15deg" }
                              ],marginTop:20,marginLeft:15}]}>
                                          <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[1]!==undefined && this.state.selectedItems[1].ImageText}</Text>
                              </TouchableOpacity>
                          </View>
                          <TouchableOpacity style={cs.boxesWrapper}  onPress={()=>this.onpressItems(this.state.selectedItems[2])}>
                                   <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[2]!==undefined && this.state.selectedItems[2].imageName} />
                                   <Text style={cs.pairBoxFont}>{this.state.selectedItems[2]!==undefined && this.state.selectedItems[2].ImageText}</Text>
                           </TouchableOpacity>
                             <View style={cs.pairBox}>
                              <TouchableOpacity style={cs.boxesPairWrapper}  onPress={()=>this.onpressItems(this.state.selectedItems[3])}>
                                           <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[3]!==undefined && this.state.selectedItems[3].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.state.selectedItems[3]!==undefined && this.state.selectedItems[3].ImageText}</Text>
                              </TouchableOpacity>
                               {dashboardStatus.length!==0 && this.state.selectedItems.length>4 && 
                              <TouchableOpacity  onPress={()=>this.onpressItems(this.state.selectedItems[4])} style={[cs.boxesPairWrapper,{  transform: [
                               
                               { rotateZ: "-20deg" }
                              ]}]}>
                                       <Image style={cs.boxPairImageStyle} source={this.state.selectedItems[4]!==undefined && this.state.selectedItems[4].imageName} />
                                        <Text style={cs.pairBoxFont}>{this.state.selectedItems[4]!==undefined && this.state.selectedItems[4].ImageText}</Text>
                               </TouchableOpacity>}
                            </View> 
                      </View> }
                     
                    
                  </View>
              </View>}
              </ScrollView> 
            
             
            {/* </View> */}
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
 getGroupStudent
}

const styles = StyleSheet.create({
 
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardBox);
