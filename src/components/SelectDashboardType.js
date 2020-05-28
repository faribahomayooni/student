/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View,StyleSheet, Dimensions,ScrollView,TouchableOpacity} from 'react-native';
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

async componentDidMount() {
  
  }

  render() {
    // console.warn("sdsd",this.props.navigation.state)
  
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
              <TouchableOpacity    style={[cs.buttondashbordStyle,{width:"90%"}]} onPress={()=> this.props.navigation.navigate('ChoosedDashboard',{typeTemplate:this.state.typeTemplate})}>
                  <Text style={{color:"white",marginBottom:10,alignSelf:"center",fontSize:16}}>Submit</Text>
              </TouchableOpacity>
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
