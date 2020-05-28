/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View,StyleSheet, Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import {connect} from 'react-redux';
import axios from 'axios';

const {width,height}=Dimensions.get("window")
class DashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state={
        typeTemplate:"Transfrom"
     
    }
  }

async componentDidMount() {
  
  }

  render() {
    console.warn("sdsd",this.props.navigation.state.params.typeTemplate)  
    return (
      <View style={{alignItems:"center",padding:15}}>
         
              <View style={{padding:10,justifyContent:"space-around",padding:10,width:width,marginTop:10}}>
                          {this.props.navigation.state.params.typeTemplate==="TwoRow" && <View style={{marginTop:width/5}} >
                              
                                <View style={[cs.pairBox]}>
                                        <View
                                    
                                          style={[cs.boxesWrapper,{width:width*0.70}]}>
                                        </View>
                                </View>
                                    <View  style={[cs.pairBox,{marginTop:10}]}>
                                        <View
                                    
                                        style={[cs.boxesWrapper,{width:width*0.70}]}>
                                        </View>
                                    </View> 
                            </View> }
                      {this.props.navigation.state.params.typeTemplate==="ThreeRow" &&  <View >
                           
                            <View style={cs.pairBox}>
                                    <View
                                    style={cs.boxesWrapper}>
                                    </View>
                            </View>
                                <View style={cs.pairBox}>
                                    <View
                                
                                    style={cs.boxesWrapper}>
                                    </View>
                                </View> 
                                <View style={cs.pairBox}>
                                    <View
                                    style={cs.boxesWrapper}>
                                    </View>
                                </View> 
                        </View> }
                    
                  <View>
                
                   {this.props.navigation.state.params.typeTemplate==="default"  &&
                   <View >
                   
                         <View style={cs.boxesWrapper}>
                         </View>
                         <View style={cs.pairBox}>
                                <View
                               
                                style={cs.boxesPairWrapper}>
                                </View>
                                <View
                               
                                style={cs.boxesPairWrapper}>
                                </View>
                          </View>
                            <View style={cs.pairBox}>
                                <View style={cs.boxesPairWrapper}>
                                </View>
                                <View
                               
                                style={cs.boxesPairWrapper}>
                                </View>
                            </View> 
                      </View> }
                
                     {this.props.navigation.state.params.typeTemplate==="Transfrom"  &&
                     <View >
                      
                         <View style={cs.pairBox}>
                                <View 
                                style={[cs.boxesPairWrapper,{  transform: [
                               
                                   { rotateZ: "-20deg" }
                                  ]}]}>
                                </View>
                                <View
                               style={[cs.boxesPairWrapper,{  transform: [
                             
                               { rotateZ: "15deg" }
                              ],marginTop:20,marginLeft:15}]}>
                                </View>
                          </View>
                          <View style={cs.boxesWrapper}>
                         </View>
                            <View style={cs.pairBox}>
                                <View style={cs.boxesPairWrapper}>
                                </View>
                                <View
                               
                               style={[cs.boxesPairWrapper,{  transform: [
                               
                               { rotateZ: "-20deg" }
                              ]}]}>
                                </View>
                            </View> 
                      </View> }
                    
                  </View>
              </View>
             
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
