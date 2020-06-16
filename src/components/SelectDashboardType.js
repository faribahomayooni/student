/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View,StyleSheet, Dimensions,ScrollView,TouchableOpacity,ToastAndroid,Image} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import {connect} from 'react-redux';

// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import { TouchableOpacity } from 'react-native-gesture-handler';


const {width,height}=Dimensions.get("window")
class DashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state={
        typeTemplate:"TwoRow"
     
    }
  }

 componentDidMount() {
  if(this.props.navigation.state.params!==undefined){
    this.props.navigation.state.params.layout===1 && this.setState({typeTemplate:"TwoRow"}) || this.props.navigation.state.params.layout===2 && this.setState({typeTemplate:"ThreeRow"}) || 
    this.props.navigation.state.params.layout===3 && this.setState({typeTemplate:"default"}) ||  this.props.navigation.state.params.layout===4 && this.setState({typeTemplate:"Transfrom"})
  }
  
  }

  CanSelected=()=>{
    if(this.state.typeTemplate==="default" || this.state.typeTemplate==="Transfrom")
    {
      // console.warn("eeeeeeeeeeeeeee",this.props.navigation.state.params.selected.length)
       if(this.props.navigation.state.params.selected.length<4){
      console.warn("select 5 items")
      ToastAndroid.show(
        'you can`t select this type ',
        ToastAndroid.SHORT,
      );
    
    }else
     { this.props.navigation.navigate('ChoosedDashboard',{typeTemplate:this.state.typeTemplate,selectedItems:this.props.navigation.state.params.selected})}
    }if(this.state.typeTemplate==="TwoRow"){
      if(this.props.navigation.state.params.selected.length<2 || this.props.navigation.state.params.selected.length>2){
        console.warn("select 2 items")
        ToastAndroid.show(
          'you can`t select this type ',
          ToastAndroid.SHORT,
        );

    }else{
      this.props.navigation.navigate('ChoosedDashboard',{typeTemplate:this.state.typeTemplate,selectedItems:this.props.navigation.state.params.selected})
    }
    }
    if(this.state.typeTemplate==="ThreeRow"){
      if(this.props.navigation.state.params.selected.length<3 || this.props.navigation.state.params.selected.length>3){
      ToastAndroid.show(
        'you can`t select this type ',
        ToastAndroid.SHORT,
      );}
    else{
      this.props.navigation.navigate('ChoosedDashboard',{typeTemplate:this.state.typeTemplate,selectedItems:this.props.navigation.state.params.selected})
    }
  }
  }

  render() {
     console.warn("**this is selected dashboard ***",this.props.navigation.state.params.selected)
  
    return (
      <View style={{alignItems:"center",padding:15}}>
          <View style={{alignItems:"center",marginTop:10}}>
                  <Text style={{fontSize:25}}>Hoe will je je</Text>
                  <Text style={{fontSize:25}}>dashboard indelen</Text>
              </View>
              <View style={{flexDirection:"row",padding:10,justifyContent:"space-around",padding:10,width:width,marginTop:10}}>
                  <View style={{justifyContent:"space-between"}} >
                      <TouchableOpacity  onPress={()=>this.setState({typeTemplate:"TwoRow"})}>
                            <View style={{borderWidth:this.state.typeTemplate==="TwoRow" ? 2:1,borderRadius:10,width:width*0.3,paddingBottom:20,borderColor:this.state.typeTemplate==="TwoRow" ? "#5467fd":"black"}}>
                                <Text style={{fontSize:15,alignSelf:"center"}}>Home</Text>
                                <View style={cs.pairBox}>
                                        <View
                                        style={cs.boxesTeacherWrapper}>
                                            
                                        </View>
                                </View>
                                    <View style={cs.pairBox}>
                                        <View
                                    
                                        style={cs.boxesTeacherWrapper}>
                                        </View>
                                    </View> 
                            </View> 
                      </TouchableOpacity>
                      <TouchableOpacity  onPress={()=>this.setState({typeTemplate:"ThreeRow"})}>
                        <View style={{borderWidth:this.state.typeTemplate==="ThreeRow" ? 2:1,borderRadius:10,width:width*0.3,borderColor:this.state.typeTemplate==="ThreeRow" ? "#5467fd":"black"}}>
                            <Text style={{fontSize:15,alignSelf:"center"}}>Home</Text>
                            <View style={cs.pairBox}>
                                    <View
                                    style={cs.boxesTeacherWrapperdec}>
                                    </View>
                            </View>
                                <View style={cs.pairBox}>
                                    <View
                                
                                    style={cs.boxesTeacherWrapperdec}>
                                    </View>
                                </View> 
                                <View style={cs.pairBox}>
                                    <View
                                    style={cs.boxesTeacherWrapperdec}>
                                    </View>
                                </View> 
                        </View> 
                        </TouchableOpacity>
                  </View>
                  <View>
                  <TouchableOpacity  onPress={()=>this.setState({typeTemplate:"default"})}> 
                     <View style={{borderWidth:this.state.typeTemplate==="default" ? 2:1,borderRadius:10,width:width*0.3,paddingBottom:10,borderColor:this.state.typeTemplate==="default" ? "#5467fd":"black"}}>
                     <Text style={{fontSize:15,alignSelf:"center"}}>Home</Text>
                         <View style={cs.boxesTeacherWrapper}>
                         </View>
                         <View style={cs.pairBox}>
                                <View
                               
                                style={cs.boxtDashbordStyletit}>
                                </View>
                                <View
                               
                                style={cs.boxtDashbordStyletit}>
                                </View>
                          </View>
                            <View style={cs.pairBox}>
                                <View style={cs.boxtDashbordStyletit}>
                                </View>
                                <View
                               
                                style={cs.boxtDashbordStyletit}>
                                </View>
                            </View> 
                      </View> 
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>this.setState({typeTemplate:"Transfrom"})}> 
                      <View style={{borderWidth:this.state.typeTemplate==="Transfrom" ? 2:1,borderRadius:10,width:width*0.3,marginTop:10,borderColor:this.state.typeTemplate==="Transfrom" ? "#5467fd":"black"}}>
                        <Text style={{fontSize:15,alignSelf:"center"}}>Home</Text>
                         <View style={cs.pairBox}>
                                <View
                               
                                style={[cs.boxtDashbordStyletit,{  transform: [
                                    // { rotateX: "45deg" },
                                   { rotateZ: "-20deg" }
                                  ]}]}>
                                </View>
                                <View
                               style={[cs.boxtDashbordStyletit,{  transform: [
                                // { rotateX: "45deg" },
                               { rotateZ: "15deg" }
                              ],marginTop:15}]}>
                                </View>
                          </View>
                          <View style={cs.boxesTeacherWrapper}>
                         </View>
                            <View style={cs.pairBox}>
                                <View style={cs.boxtDashbordStyletit}>
                                </View>
                                <View
                               
                               style={[cs.boxtDashbordStyletit,{  transform: [
                                // { rotateX: "45deg" },
                               { rotateZ: "-20deg" }
                              ]}]}>
                                </View>
                            </View> 
                      </View> 
                      </TouchableOpacity>
                  </View>
              </View>
              
          <TouchableOpacity style={[cs.buttondashbordStyle,{position:"absolute",bottom:0,top:height*0.61,padding:20,marginTop:width*0.15,height:"10%"}]} onPress={()=>this.CanSelected()}>
               <Text style={{color:"white"}}>submit</Text>
           </TouchableOpacity>
              {/* <TouchableOpacity style={[cs.buttondashbordStyle,{position:"absolute",bottom:0,top:width,padding:20,marginTop:width*0.15}]} onPress={()=> this.CanSelected()}>
               <Text style={{color:"white"}}>Submit</Text>
           </TouchableOpacity> */}
              {/* <TouchableOpacity    style={[cs.buttondashbordStyle,{width:"90%"}]} onPress={()=> this.CanSelected()}>
                  <Text style={{color:"white",marginBottom:10,alignSelf:"center",fontSize:16}}>Submit</Text>
              </TouchableOpacity> */}
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
